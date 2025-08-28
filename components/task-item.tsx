import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import type { Doc } from "../convex/_generated/dataModel";

interface TaskItemProps {
  task: Doc<"tasks">;
  onCompleted: (task: Doc<"tasks">) => void;
  onDeleted: (taskId: Doc<"tasks">["_id"]) => void;
  showDeleteButton?: boolean;
  showTaskDescription?: boolean;
}

export function TaskItem({
  task,
  onCompleted,
  onDeleted,
  showDeleteButton = true,
  showTaskDescription = true,
}: TaskItemProps) {
  return (
    <div className="flex items-center p-3">
      <Button
        asChild
        variant="ghost"
        className="flex h-auto flex-1 cursor-pointer gap-0 justify-start whitespace-normal"
        onClick={() => onCompleted(task)}
      >
        <div className="grid">
          <p
            className={cn(
              "flex-1 break-words",
              task.completed && "text-muted-foreground line-through",
            )}
          >
            {task.taskTitle}
          </p>
          {showTaskDescription && (
            <p className="text-muted-foreground text-sm font-normal line-clamp-1">
              {task.taskDescription}
            </p>
          )}
        </div>
      </Button>

      {showDeleteButton && (
        <Button
          variant="ghost"
          onClick={() => onDeleted(task._id)}
          className="group hover:bg-destructive/10 ml-auto"
          size="icon"
        >
          <Trash2 className="group-hover:text-destructive size-4" />
        </Button>
      )}
    </div>
  );
}
