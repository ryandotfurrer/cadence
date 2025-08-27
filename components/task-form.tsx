"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TaskFormProps {
  taskTitle: string;
  setTaskTitle: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function TaskForm({
  taskTitle,
  setTaskTitle,
  onSubmit,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Label htmlFor="task-title" className="sr-only">
        Task Title
      </Label>
      <Input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        required
        placeholder="add a task"
        id="task-title"
      />
      {/*<Label htmlFor="task-description" className="sr-only">
        Task Description
      </Label>
      <Input
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="add more details (optional)"
        id="task-description"
      />*/}
      <Button type="submit">Add Task</Button>
    </form>
  );
}
