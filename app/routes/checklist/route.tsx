import { data } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

export const loader = async () => {
  const prisma = new PrismaClient();
  const query = {
    include: {
      owner: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  };

  const tasks = await prisma.task.findMany(query);

  return data({ tasks });
};

export default function Index() {
  const { tasks } = useLoaderData<typeof loader>();

  if (!tasks?.length) return <p>Add your first task</p>;

  return (
    <>
      <h1>Checklist</h1>
      <Link to="/checklist/new">Create Task</Link>

      {!tasks.length ? (
        <p>No tasks.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <span>{task.owner.firstName}</span>
              <p>{task.state}</p>
              <p>{task.description}</p>
              <Form
                action={`${task.id}/delete`}
                method="post"
                onSubmit={(event) => {
                  const response = confirm("Please confirm you want to delete this task.");
                  if (!response) {
                    event.preventDefault();
                  }
                }}
              >
                <button type="submit">Delete</button>
              </Form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
