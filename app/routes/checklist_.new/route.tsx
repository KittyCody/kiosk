import { Form, useNavigate } from "@remix-run/react";
import { ActionFunctionArgs, redirect, data } from "@remix-run/node";
import { createTask } from "@kiosk/audit/routes/checklist_.new/create.task";
import { Task } from "@kiosk/audit/models/task";
import { USERS } from "@kiosk/audit/utils/constants/users";
import { validateTask } from "@kiosk/audit/routes/checklist_.new/task.validator";

export const action = async ({ request }: ActionFunctionArgs) => {
  const currentUser = USERS[0];

  const formData = await request.formData();
  const taskPartial: Partial<Task> = Object.fromEntries(formData);

  const error = validateTask(taskPartial);
  if (error) {
    return data(error, { status: 400 });
  }

  await createTask(currentUser.id, taskPartial);

  return redirect(`/checklist`);
};

export default function Index() {
  const navigate = useNavigate();

  return (
    <>
      <h2>New Task</h2>

      <Form id="task-form" method="post">
        <p>
          <span>Title</span>
          <input aria-label="Title" name="title" placeholder="Title" type="text" />
        </p>
        <label>
          <span>Description</span>
          <textarea name="description" rows={6} />
        </label>
        <p>
          <button type="submit">Save</button>
          <button onClick={() => navigate(-1)} type="button">
            Cancel
          </button>
        </p>
      </Form>
    </>
  );
}
