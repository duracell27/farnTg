import { Werehouse } from "@/models/Werehouse";
import connect from "@/utils/db";

export const GET = async (req) => {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  try {
    await connect();

    const werehouse = await Werehouse.findOne({ userId }).populate("silo.crop");

    return new Response(JSON.stringify(werehouse), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};