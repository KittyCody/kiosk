import prisma from "@kiosk/audit/context/db";
import { SubTaskState } from "@kiosk/audit/models/subTask.state";

const taskExists = async (taskId: string): Promise<boolean> => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
    select: {
      id: true,
    },
  });

  return !!task;
};

export const createSubtask = async (title: string, taskId: string) => {
  const exists = await taskExists(taskId);
  if (!exists) {
    throw new Response("task:not_found", { status: 404 });
  }

  await prisma.subTask.create({
    data: {
      title: title,
      state: SubTaskState.Todo,
      taskId: taskId,
    },
  });
};
