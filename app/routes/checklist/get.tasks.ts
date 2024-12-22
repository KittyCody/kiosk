import { TaskState } from "@kiosk/audit/models/task.state";
import prisma from "@kiosk/audit/context/db";

export interface TaskSearchFilter {
  title?: string;
  state?: TaskState;
  userName?: string;
}

export async function getTasks(filter: TaskSearchFilter) {
  return await prisma.task.findMany({
    where: buildQuery(filter),
    include: {
      owner: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
}

const buildQuery = (filter: TaskSearchFilter): any => {
  const where: any = {};
  if (filter.title) {
    where.title = {
      contains: filter.title,
      mode: "insensitive",
    };
  }

  if (filter.state) {
    where.state = {
      equals: filter.state,
      mode: "insensitive",
    };
  }

  if (filter.userName) {
    where.OR = [
      {
        owner: {
          firstName: {
            contains: filter.userName,
            mode: "insensitive",
          },
        },
      },
      {
        owner: {
          lastName: {
            contains: filter.userName,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  return where;
};
