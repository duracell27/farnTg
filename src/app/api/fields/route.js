import { Field } from "@/models/Fields";
import { Werehouse } from "@/models/Werehouse";
import connect from "@/utils/db";

export const GET = async (req) => {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  try {
    await connect();

    const fields = await Field.findOne({ userId })
      .select("fields")
      .populate("fields.crop");

    return new Response(JSON.stringify(fields), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const { cropId, fieldId, userId, type } = body;
  // const url = new URL(req.url);
  // const userId = url.searchParams.get('userId');

  try {
    // Подключаемся к базе данных
    await connect();

    // Находим запись по userId
    const userFields = await Field.findOne({ userId });

    if (!userFields) {
      return new Response(
        JSON.stringify({ message: "User fields not found" }),
        { status: 404 }
      );
    }

    // Находим поле по fieldId и обновляем его
    const field = userFields.fields.id(fieldId);
    if (!field) {
      return new Response(JSON.stringify({ message: "Field not found" }), {
        status: 404,
      });
    }

    if (type === "plant") {
      field.crop = cropId;
      field.status = "grow";
    } else if (type === "harvest") {
      field.status = "empty";
      field.tapsOnField = 0;
      field.crop = null;
    }

    // Сохраняем изменения
    await userFields.save();

    if (type === "harvest") {
      const userWerehouse = await Werehouse.findOne({ userId });

      if (!userWerehouse) {
        return new Response(
          JSON.stringify({ message: "User werehouse not found" }),
          { status: 404 }
        );
      }

      const siloItem = userWerehouse.silo.find((item) =>
        item.crop.equals(cropId)
      );

      if (siloItem) {
        // Если элемент существует, обновляем его количество
        siloItem.amount += 1;
      } else {
        // Если элемент не существует, добавляем его в массив
        userWerehouse.silo.push({ crop: cropId, amount: 1 });
      }

      // Сохраняем изменения в складе
      await userWerehouse.save();
    }

    return new Response(
      JSON.stringify({ message: "Field updated successfully", field }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error updating field", error: error.message }),
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  const body = await req.json();
  const { fieldId, userId, amount } = body;
  // const url = new URL(req.url);
  // const userId = url.searchParams.get('userId');

  try {
    // Подключаемся к базе данных
    await connect();

    // Находим запись по userId
    const userFields = await Field.findOne({ userId }).populate("fields.crop");

    if (!userFields) {
      return new Response(
        JSON.stringify({ message: "User fields not found" }),
        { status: 404 }
      );
    }

    // Находим поле по fieldId и обновляем его
    const field = userFields.fields.id(fieldId);
    if (!field) {
      return new Response(JSON.stringify({ message: "Field not found" }), {
        status: 404,
      });
    }
    console.log("onField", field.tapsOnField);
    console.log("oncrop", field.crop.tapsToGrow);
    if (field.tapsOnField < field.crop.tapsToGrow) {
      console.log("+1");
      field.tapsOnField += amount;
    } else {
      console.log("from ready");
      field.status = "ready";
    }

    // Сохраняем изменения
    await userFields.save();

    return new Response(
      JSON.stringify({ message: "Field updated successfully", field }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error updating field", error: error.message }),
      { status: 500 }
    );
  }
};
