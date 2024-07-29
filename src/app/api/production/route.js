import { Product } from "@/models/Product";
import { Production } from "@/models/Production";
import { ProductionBuildings } from "@/models/ProductionBuildings";
import { Werehouse } from "@/models/Werehouse";
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

    buildingObj.slots = {product: null, tapsOnProduct:0, slotStatus: 'empty'}

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

    const buildings = await Production.find({ userId }).select('building').lean();

    console.log('buildings',buildings)
    
    // Populate only non-null product fields
    for (let building of buildings) {
      for (let slot of building.building.slots) {
        console.log('slot',slot)
        if (slot.product) {
          slot.product = await Product.findById(slot.product).lean();
        }
      }
    }


    return new Response(JSON.stringify(buildings), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const PUT = async (req) => {
  const body = await req.json();
        
  const { productionId, productId,slotId, amount, userId} = body;
console.log('2')
  try {
    await connect();

   const productionObject = await Production.findOne({_id: productionId})
   productionObject.building.slots[slotId].product = null;
   productionObject.building.slots[slotId].tapsOnProduct = 0;
   productionObject.building.slots[slotId].slotStatus = 'empty';

   await productionObject.save();

   const userWerehouse = await Werehouse.findOne({ userId });

    if (!userWerehouse) {
      return new Response(
        JSON.stringify({ message: "User werehouse not found" }),
        { status: 404 }
      );
    }

    // Find if the product already exists in the werehouse array
    const werehouseItem = userWerehouse.werehouse.find((item) =>
      item.product.equals(productId)
    );

    if (werehouseItem) {
      // If item exists, increment the amount
      werehouseItem.amount += amount;
    } else {
      // If item does not exist, add it to the array
      userWerehouse.werehouse.push({ product: productId, amount: amount });
    }

    // Save the changes to the werehouse document
    await userWerehouse.save();


    return new Response(
      JSON.stringify({ message: "add to werehouse" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
