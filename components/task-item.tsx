import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import type { Doc } from "../convex/_generated/dataModel";

interface TaskItemProps {
  task: Doc<"tasks">;
  onCompleted: (task: Doc<"tasks">) => void;
  onDeleted: (taskId: Doc<"tasks">["_id"]) => void;
  showDeleteButton?: boolean;
}

export function TaskItem({ 
  task, 
  onCompleted, 
  onDeleted, 
  showDeleteButton = true 
}: TaskItemProps) {
  return (
    <div className="flex items-center p-3">
      <Button
        asChild
        variant="ghost"
        className="flex justify-start flex-1 whitespace-normal cursor-pointer"
        onClick={() => onCompleted(task)}
      >
        <p
          className={cn(
            "flex-1 break-words",
            task.completed && "text-muted-foreground line-through"
          )}
        >
          {task.taskTitle}
        </p>
      </Button>
      
      {showDeleteButton && (
        <Button
          variant="ghost"
          onClick={() => onDeleted(task._id)}
          className="group ml-auto hover:bg-destructive/10"
          size="icon"
        >
          <Trash2 className="group-hover:text-destructive size-4" />
        </Button>
      )}
    </div>
  );
}
