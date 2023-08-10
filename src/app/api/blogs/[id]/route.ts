import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import dbConn from "@/src/libs/dbConn";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConn();
    const id = await req.url.split("/blogs/")[1];
    const post = await prisma.post.findFirst({
      where: { id },
    });
    if (!post) {
      return NextResponse.json({ message: "Success", post }, { status: 404 });
    }
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConn();
    const { title, description } = await req.json();
    const id = await req.url.split("/blogs/")[1];
    const post = await prisma.post.update({
      where: {
        id,
      },
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
    const id = await req.url.split("/blogs/")[1];
    const deleteAll = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Post deleted", deleteAll },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
