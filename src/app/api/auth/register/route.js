import { User } from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const body = await req.json();
  const { name, email, password } = body;

  //   console.log(name, email, password);

  try {
    await connect();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

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
