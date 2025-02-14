import { Field } from "@/models/Fields";
import { User } from "@/models/User";
import { Werehouse } from "@/models/Werehouse";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const body = await req.json();
  const { name, email, password } = body;

  

  try {
    await connect();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    //first field creation
    const firstField = {crop:null, tapsOnField: 0, status: 'empty'}

    const userField = new Field({userId: newUser._id, fields: [firstField]});
    await userField.save();
    const userWerehouse = new Werehouse({userId: newUser._id, silo: [], werehouse: []})
    await userWerehouse.save();

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
