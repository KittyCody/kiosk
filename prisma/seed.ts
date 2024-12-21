import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();
  const id = crypto.randomUUID();

  await prisma.user.create({
    data: {
      id: id,
      firstName: "Jean-Marc",
      lastName: "Janco",
    },
  });
}

main()
    .then(() => console.log("Seed succeeded!"))
    .catch(console.error);
