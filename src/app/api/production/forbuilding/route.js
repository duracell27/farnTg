import { Product } from "@/models/Product";
import { Production } from "@/models/Production";

import connect from "@/utils/db";

export const GET = async (req) => {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  

  try {
    await connect();

    const products = await Product.find({ productFor: type }).populate('needs.crop')
  

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const { userId, productId, productionId,slotIndex } = body;

  console.log('production id',productionId )
  console.log('slot index',slotIndex )

  try {
    await connect();

   const userProduction =  await Production.findOne({ _id: productionId })

//    console.log('from build',userProduction)
    // // {$push: {'building.slots': {product: productId, tapsOnProduct:0, slotStatus: 'production'}}});
    userProduction.building.slots[slotIndex] = {product: productId, tapsOnProduct:0, slotStatus: 'production'}

    await userProduction.save();


    return new Response(
      JSON.stringify({ message: "ready to produce" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const PUT = async (req) => {
  const body = await req.json();
  const { productionId, index } = body;

  try {
    await connect();

   const productionObj = await Production.findOne({ _id: productionId }).populate('building.slots.product');
   const completedAmountTaps = productionObj.building.slots[index].product.tapsToProduce

   console.log('completed amount taps',completedAmountTaps)
   console.log('total amount taps',productionObj.building.slots[index].tapsOnProduct)

   if(productionObj.building.slots[index].tapsOnProduct+1 < completedAmountTaps){
     productionObj.building.slots[index].tapsOnProduct+=1;

   }else{
    productionObj.building.slots[index].tapsOnProduct+=1;
     productionObj.building.slots[index].slotStatus ='ready';
   }


   await productionObj.save();
    


    return new Response(
      JSON.stringify({ message: "updated" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};