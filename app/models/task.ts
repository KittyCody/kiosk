import { TaskState } from "@kiosk/audit/models/task.state";
import { SubTask } from "@kiosk/audit/models/subTask";

export interface Task {
  id: string;
  title: string;
  state: TaskState;
  description?: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  subTasks: SubTask[];
}
