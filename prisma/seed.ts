import { PrismaClient } from "@prisma/client";
import { USERS } from "@kiosk/audit/utils/constants/users";

async function main() {
  const prisma = new PrismaClient();

  for (const user of USERS) {
    await prisma.user.create({
      data: {
        ...user,
      },
    });
  }
}

main()
  .then(() => console.log("Seed succeeded!"))
  .catch(console.error);
