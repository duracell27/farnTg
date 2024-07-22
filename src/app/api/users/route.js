import { NextResponse } from "next/server"

export const GET = async (req)=>{
    return new NextResponse('It works', {status: 200})
}