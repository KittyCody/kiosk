import { SubTaskState } from "@kiosk/audit/models/subTask.state";

export interface SubTask {
  id: string;
  title: string;
  state: SubTaskState;
}
