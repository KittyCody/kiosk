import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { createSubtask } from "@kiosk/audit/routes/checklist.$taskId.subTasks/create.subtask";

const validate = (title: string) => {
  let err = "";
  if (!title) {
    err = "title:empty_value";
  } else if (title.length > 50) {
    err = "title:too_long";
  }

  if (err) {
    throw new Response(err, { status: 400 });
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.taskId, "taskId is required");

  const formDate = await request.formData();
  const subTaskTitle = formDate.get("title") as string;

  validate(subTaskTitle);

  await createSubtask(subTaskTitle, params.taskId);

  return redirect(`/checklist/${params.taskId}`);
};
