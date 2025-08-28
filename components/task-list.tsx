import { AudioWaveform } from "lucide-react";
import { TaskItem } from "./task-item";
import type { Doc } from "../convex/_generated/dataModel";

interface TaskListProps {
  tasks: Doc<"tasks">[] | undefined;
  onTaskCompleted: (task: Doc<"tasks">) => void;
  onTaskDeleted: (taskId: Doc<"tasks">["_id"]) => void;
  emptyMessage: string;
  showDeleteButton?: boolean;
}

export function TaskList({ 
  tasks, 
  onTaskCompleted, 
  onTaskDeleted, 
  emptyMessage, 
  showDeleteButton = true 
}: TaskListProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <AudioWaveform className="text-muted mx-auto size-32 mb-4" />
          <p className="text-muted-foreground text-lg font-semibold">
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onCompleted={onTaskCompleted}
          onDeleted={onTaskDeleted}
          showDeleteButton={showDeleteButton}
        />
      ))}
    </div>
  );
}
