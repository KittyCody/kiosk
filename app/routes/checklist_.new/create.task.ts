import { Task } from "@kiosk/audit/models/task";
import { TaskState } from "@kiosk/audit/models/task.state";
import { PrismaClient } from "@prisma/client";

export async function createTask(ownerId: string, taskPart: Partial<Task>) {
  const prisma = new PrismaClient();

  const task = {
    title: taskPart.title ?? "",
    description: taskPart.description,
    state: TaskState.Todo,
    ownerId,
  };

  await prisma.task.create({
    data: task,
  });
}
