import { Product } from "@/models/Product";

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
