import { useList } from "@refinedev/core";
import {
  KanbanBoardContainer,
  KanbanBoard,
} from "../../components/tasks/kanban/board";
import KanbanColunm from "../../components/tasks/kanban/column";
import KanbanItem from "../../components/tasks/kanban/item";
import { TASK_STAGES_QUERY, TASKS_QUERY } from "../../graphql/queries";
import React from "react";
import { TaskStage } from "../../graphql/schema.types";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { TasksQuery } from "../../graphql/types";
import ProjectCard, { ProjectCardMemo } from "../../components/tasks/kanban/card";

const List = () => {
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: "taskStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
  });
  const { data: tasks, isLoading: isLoadingTasks } = useList<
    GetFieldsFromList<TasksQuery>
  >({
    resource: "tasks",
    sorters: [
      {
        field: "dueDate",
        order: "asc",
      },
    ],
    queryOptions: {
      enabled: !!stages,
    },
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: TASKS_QUERY,
    },
  });
  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unnasignedStage: [],
        stages: [],
      };
    }
    const unassignedStage = tasks.data.filter(
      (tasks) => tasks.stageId === null
    );
    const grouped: TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter((task) => task.stageId?.toString() === stage.id),
    }));
    return {
      unassignedStage,
      columns: grouped,
    };
  }, [stages, tasks]);
  //   console.log("alo: ", tasks);

  const handleAddCard = (args: { stageId: string }) => {};
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard>
          <KanbanColunm
            id="unassigned"
            title={"unassigned"}
            count={taskStages.unassignedStage?.length || 0}
            onAddClick={() => handleAddCard({ stageId: "unassigned" })}
          >
            {taskStages.unassignedStage?.map((task) => (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...task, stageId: "unassigned" }}
              >
                <ProjectCardMemo {...task} dueDate={task.dueDate || undefined} />
              </KanbanItem>
            ))}
          </KanbanColunm>
        </KanbanBoard>
      </KanbanBoardContainer>
    </>
  );
};

export default List;
