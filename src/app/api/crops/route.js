
import { Crop } from "@/models/Crop";
import connect from "@/utils/db";


export const POST = async (req) => {
  const body = await req.json();
  const { name, email, password } = body;

  //   console.log(name, email, password);

  try {
    await connect();
    
    await Crop.create(body)

    return new Response(
      JSON.stringify({ message: "Культура додана" }),
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
    
    const crops = await Crop.find({});

    return new Response(
      JSON.stringify(crops),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
