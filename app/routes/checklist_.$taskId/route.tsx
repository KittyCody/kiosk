import { data, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import prisma from "@kiosk/audit/context/db";
import { Form, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.taskId, "taskId is required");

  const task = await prisma.task.findFirst({
    where: {
      id: params.taskId,
    },
    include: {
      owner: true,
      subTasks: true,
    },
  });

  if (!task) {
    throw new Response("task:not_found", { status: 404 });
  }

  return data({ task });
};

export default function Index() {
  const { task } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{task.title}</h1>
      <span>
        {task.owner.firstName} {task.owner.lastName}
      </span>
      <div>{task.state}</div>
      <Form method={"post"} action={`/checklist/${task.id}/subTasks`}>
        <input type="text" name="title" />
        <input type="submit" value="Add Subtask" />
      </Form>

      <ul>
        {task.subTasks.map((subTask) => (
          <li key={subTask.id}>{subTask.title}</li>
        ))}
      </ul>

      <p>{task.description}</p>
    </div>
  );
}
