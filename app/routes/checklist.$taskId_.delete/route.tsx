import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { PrismaClient } from "@prisma/client";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.taskId, "Missing taskId param");
  const prisma = new PrismaClient();

  await prisma.task.delete({
    where: {
      id: params.taskId,
    },
  });

  return redirect("/checklist");
};
