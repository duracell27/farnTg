import { Production } from "@/models/Production";
import connect from "@/utils/db";


export const GET = async (req) => {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
 
    try {
      await connect();
      
      const productionBuildings = await Production.find({userId});
  
      return new Response(
        JSON.stringify(productionBuildings),
        { status: 200 }
      );
    } catch (error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  };
  