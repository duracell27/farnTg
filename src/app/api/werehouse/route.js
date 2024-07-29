import { Werehouse } from "@/models/Werehouse";
import connect from "@/utils/db";
import mongoose from "mongoose";

export const GET = async (req) => {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  try {
    await connect();

    const werehouse = await Werehouse.findOne({ userId }).lean();

    if (werehouse) {
      for (let i = 0; i < werehouse.silo.length ||0; i++) {
        if (werehouse.silo[i].crop) {
          werehouse.silo[i].crop = await mongoose
            .model("Crop")
            .findById(werehouse.silo[i].crop)
            .lean();
        }
      }
      for (let i = 0; i < werehouse.werehouse.length ||0; i++) {
        if (werehouse.werehouse[i].product) {
          werehouse.werehouse[i].product = await mongoose
            .model("Product")
            .findById(werehouse.werehouse[i].product)
            .lean();
        }
      }
    }

    return new Response(JSON.stringify(werehouse), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};