import { USERS } from "@kiosk/audit/utils/constants/users";
import prisma from "@kiosk/audit/context/db";
import { TaskState } from "@kiosk/audit/models/task.state";

async function main() {
  await seedUsers();
  await seedTasks(USERS.map(({ id }) => id));
}

async function seedUsers() {
  for (const user of USERS) {
    await prisma.user.create({
      data: {
        ...user,
      },
    });
  }
}

async function seedTasks(userIds: string[]) {
  await seedUserTasks(userIds[0], ["Fix the car", "Clean the house", "Do Groceries"]);
  await seedUserTasks(userIds[1], ["Learn German", "Get in shape", "Read more books"]);
}

async function seedUserTasks(ownerId: string, titles: string[]) {

  for (let i = 0; i < titles.length; i++){
    const title = titles[i];
    const state = i === 0 ? TaskState.Todo : i === 1 ? TaskState.Doing : TaskState.Done;

    await prisma.task.create({
      data: {
        title,
        ownerId,
        state,
        description: "Some description",
      }
    })
  }
}

main()
  .then(() => console.log("Seed succeeded!"))
  .catch(console.error);
