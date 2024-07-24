
import { Product } from "@/models/Product";
import connect from "@/utils/db";


export const POST = async (req) => {
  const body = await req.json();
 

  try {
    await connect();
    
    await Product.create(body)

    return new Response(
      JSON.stringify({ message: "Продукт доданий" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
