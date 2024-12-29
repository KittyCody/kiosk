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
        <div className="form-group">
          <label htmlFor="title">
            <span>Title</span>
          </label>
          <input aria-label="Title" id="title" name="title" placeholder="Title" type="text" />
        </div>

        <div className="form-group">
          <label htmlFor="description">
            <span>Description</span>
          </label>
          <textarea name="description" id="description" rows={6} placeholder="Task description" />
        </div>

        <div className="form-actions">
          <button type="submit">Save</button>
          <button onClick={() => navigate(-1)} type="button">
            Cancel
          </button>
        </div>
      </Form>
    </>
  );
}
