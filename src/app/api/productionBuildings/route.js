import { ProductionBuildings } from "@/models/ProductionBuildings";
import connect from "@/utils/db";

export const POST = async (req) => {
    const body = await req.json();
    
    try {
      await connect();
      
      await ProductionBuildings.create(body)
  
      return new Response(
        JSON.stringify({ message: "Споруда додана" }),
        { status: 201 }
      );
    } catch (error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  };

export const GET = async (req) => {
 
    try {
      await connect();
      
      const productionBuildings = await ProductionBuildings.find({});
  
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
  