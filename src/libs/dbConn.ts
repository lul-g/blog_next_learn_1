import prisma from "@/prisma";

async function dbConn() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Could not connect to DB!");
  }
}

export default dbConn;
