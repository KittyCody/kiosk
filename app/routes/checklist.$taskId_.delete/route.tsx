import { ActionFunctionArgs, data } from "@remix-run/node";
import invariant from "tiny-invariant";
import prisma from "@kiosk/audit/context/db";

const taskExists = async (taskId: string) => {
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

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.taskId, "Missing taskId param");

  const exists = await taskExists(params.taskId);
  if (!exists) {
    throw new Response("task:not_found", { status: 404 });
  }

  await prisma.task.delete({
    where: {
      id: params.taskId,
    },
  });

  return data({ success: true });
};
