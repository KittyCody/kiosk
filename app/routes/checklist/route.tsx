import { data, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useFetcher } from "@remix-run/react";
import { TaskState } from "@kiosk/audit/models/task.state";
import { getTasks, TaskSearchFilter } from "@kiosk/audit/routes/checklist/get.tasks";
import { useEffect } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const tasksFilter: Partial<TaskSearchFilter> = Object.fromEntries(searchParams);

  const tasks = await getTasks(tasksFilter);

  return data({ tasks, tasksFilter });
};

export default function Index() {
  const { tasks, tasksFilter } = useLoaderData<typeof loader>();
  const hasSearchParams = Object.values(tasksFilter).some((v) => !!v);
  const fetcher = useFetcher();

  // handles back navigation
  const updateSearchForm = () => {
    const titleField = document.getElementById("title");
    if (titleField instanceof HTMLInputElement) {
      titleField.value = tasksFilter.title || "";
    }

    const userNameField = document.getElementById("userName");
    if (userNameField instanceof HTMLInputElement) {
      userNameField.value = tasksFilter.userName || "";
    }

    const stateField = document.getElementById("state");
    if (stateField instanceof HTMLSelectElement) {
      stateField.value = tasksFilter.state || "";
    }
  };

  useEffect(updateSearchForm, [tasksFilter]);

  const handleDeleteTask = (taskId: string) => {
    const response = confirm("Please confirm you want to delete this task.");
    if (!response) {
      return;
    }

    fetcher.submit({}, { method: "POST", action: `${taskId}/delete` });
  };

  return (
    <>
      <h1>Checklist</h1>

      <Form id="search-form" method="get">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            aria-label="Title"
            name="title"
            placeholder="Title"
            type="text"
            defaultValue={tasksFilter.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            id="userName"
            aria-label="User Name"
            name="userName"
            placeholder="User"
            type="text"
            defaultValue={tasksFilter.userName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Choose an option:</label>
          <select id="state" name="state" defaultValue={tasksFilter.state}>
            <option value="">Any state</option>
            <option value={TaskState.Todo}>Todo</option>
            <option value={TaskState.Doing}>Doing</option>
            <option value={TaskState.Done}>Done</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit">Search</button>
        </div>
      </Form>

      <Link to="/checklist/new">Create Task</Link>

      {!tasks.length ? (
        <p>
          {hasSearchParams ? (
            <span>
              No tasks found using this search criteria. <Link to="/checklist">Clear filters</Link>
            </span>
          ) : (
            <span>
              No tasks. <Link to="/checklist/new">Create your first task</Link>
            </span>
          )}
        </p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <h3>
                <Link to={`/checklist/${task.id}`}>{task.title}</Link>
              </h3>
              <span>{task.owner.firstName}</span>
              <p>{task.state}</p>
              <p>{task.description}</p>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <Link to={`/checklist/${task.id}/update`}>Edit</Link>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
=======
=======
>>>>>>> Stashed changes
              <div className="task-actions">
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
              </div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
