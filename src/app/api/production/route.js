import { Production } from "@/models/Production";
import { ProductionBuildings } from "@/models/ProductionBuildings";
import connect from "@/utils/db";

export const POST = async (req) => {
  const body = await req.json();
  const { userId, type } = body;

  try {
    await connect();

    const productionBuilding = await ProductionBuildings.findOne({ type });
   

    const buildingObj = {
      name: productionBuilding.name,
      img: productionBuilding.img,
      slots: productionBuilding.slots,
      type: productionBuilding.type,
      price: productionBuilding.price,
      lvl: productionBuilding.lvl,
    };

    await Production.create({ userId, building: buildingObj });

    return new Response(
      JSON.stringify({ message: "build successfully created" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const GET = async (req) => {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  try {
    await connect();

    const buildings = await Production.find({ userId }).select('building');


    return new Response(JSON.stringify(buildings), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
