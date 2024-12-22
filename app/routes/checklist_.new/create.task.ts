import { Task } from "@kiosk/audit/models/task";
import { TaskState } from "@kiosk/audit/models/task.state";
import prisma from "@kiosk/audit/context/db";

export async function createTask(ownerId: string, taskPart: Partial<Task>) {
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
