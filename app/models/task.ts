import { TaskState } from "@kiosk/audit/models/task.state";

export interface Task {
  id: string;
  title: string;
  state: TaskState;
  description?: string;
}
