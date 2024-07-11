import { useList, useNavigation, useUpdate } from "@refinedev/core";
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
import { ProjectCardMemo } from "../../components/tasks/kanban/card";
import { KanbanAddCardButton } from "../../components/tasks/kanban/add-card-button";
import ProjectCardSkeleton from "../../components/skeleton/project-card";
import { DragEndEvent } from "@dnd-kit/core";
import { UPDATE_TASK_STAGE_MUTATION } from "../../graphql/mutations";

const List = ({ children }: React.PropsWithChildren) => {
  const { replace } = useNavigation();
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

  const { mutate: updateTask } = useUpdate();
  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unassignedStage: [],
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

  const handleAddCard = (args: { stageId: string }) => {
    const path =
      args.stageId === "unassigned"
        ? "/tasks/new"
        : `/tasks/new?stageId=${args.stageId}`;
    replace(path);
  };

  const isLoading = isLoadingStages || isLoadingTasks;

  const handleOnDragEnd = (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.stageId;

    if (taskStageId === stageId) return;
    if (stageId === "unassigned") {
      stageId = null;
    }
    updateTask({
      resource: "tasks",
      id: taskId,
      values: {
        stageId: stageId,
      },
      successNotification: false,
      mutationMode: "optimistic",
      meta: {
        gqlMutation: UPDATE_TASK_STAGE_MUTATION,
      },
    });
  };
  if (isLoading) {
    return <PageSkeleton />;
  }
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
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
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}
            {!taskStages.unassignedStage?.length && (
              <KanbanAddCardButton
                onClick={() => handleAddCard({ stageId: "unassigned" })}
              />
            )}
          </KanbanColunm>
          {taskStages.columns?.map((column) => (
            <KanbanColunm
              key={column.id}
              id={column.id}
              title={column.title}
              count={column.tasks.length}
              onAddClick={() => handleAddCard({ stageId: column.id })}
            >
              {!isLoading &&
                column.tasks.map((task) => (
                  <KanbanItem key={task.id} id={task.id} data={task}>
                    <ProjectCardMemo
                      {...task}
                      dueDate={task.dueDate || undefined}
                    />
                  </KanbanItem>
                ))}
              {!column.tasks.length && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ stageId: column.id })}
                />
              )}
            </KanbanColunm>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};

export default List;
const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;
  return (
    <KanbanBoardContainer>
      {Array.from({ length: columnCount }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </KanbanBoardContainer>
  );
};
