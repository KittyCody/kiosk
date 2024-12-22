import { Task } from "@kiosk/audit/models/task";
import { TASK_CONSTRAINTS } from "@kiosk/audit/utils/constants/task.constraints";

export const validateTask = (taskPartial: Partial<Task>): string | null => {
  if (!taskPartial.title) {
    return "title:empty_value";
  }

  if (taskPartial.title.length > TASK_CONSTRAINTS.titleLength) {
    return "title:too_long";
  }

  if (taskPartial.description && taskPartial.description.length > 300) {
    return "description:too_long";
  }

  return null;
};
