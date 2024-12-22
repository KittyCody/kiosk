import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import prisma from "@kiosk/audit/context/db";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.taskId, "Missing taskId param");

  await prisma.task.delete({
    where: {
      id: params.taskId,
    },
  });

  return redirect("/checklist");
};
