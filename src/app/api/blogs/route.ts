import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

async function dbConn() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Could not connect to DB!");
  }
}
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConn();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConn();
    const { title, description } = await req.json();
    const post = await prisma.post.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ message: "Post made", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConn();
    const deleteAll = await prisma.post.deleteMany({});
    return NextResponse.json(
      { message: "All blogs deleted", deleteAll },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
