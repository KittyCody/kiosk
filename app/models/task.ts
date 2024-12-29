import { TaskState } from "@kiosk/audit/models/task.state";
import { SubTask } from "@kiosk/audit/models/subTask";

export interface Task {
  id: string;
  title: string;
  state: TaskState;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  description?: string | undefined;
=======
=======
>>>>>>> Stashed changes
  description?: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  subTasks: SubTask[];
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}
