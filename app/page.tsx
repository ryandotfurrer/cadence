"use client";

import { Greeting } from "@/components/Greeting";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SignInButton, useUser } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { AudioWaveform, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../convex/_generated/api";

export default function Home() {
  return (
    <>
      <Authenticated>
        <Content />
      </Authenticated>
      <Unauthenticated>
        <Button asChild>
          <SignInButton />
        </Button>
      </Unauthenticated>
    </>
  );
}

function TaskForm({
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  onSubmit,
}: {
  taskTitle: string;
  setTaskTitle: (value: string) => void;
  taskDescription: string;
  setTaskDescription: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
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

function Content() {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const createTask = useMutation(api.tasks.createTask);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const tasks = useQuery(api.tasks.getForCurrentUser);
  const toggleTaskCompleted = useMutation(api.tasks.toggleTaskCompleted);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await createTask({
      userId: user.id,
      taskTitle,
      taskDescription: taskDescription || undefined,
      completed: false,
    });
    setTaskTitle("");
    setTaskDescription("");
  };

  if (tasks === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Greeting />
      <TaskForm
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        onSubmit={handleSubmit}
      />

      {tasks.length === 0 ? (
        <>
          <div className="flex items-center justify-center">
            <div className="flex flex-col">
              <AudioWaveform className="text-muted mx-auto size-32" />
              <p className="text-muted-foreground my-12 text-lg font-semibold">
                Woohoo! You've completed all your tasks
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="my-12 grid gap-y-2">
          {tasks.map((task) => (
            <div key={task._id} className="flex items-center">
              <Button
                variant="ghost"
                className="flex h-auto items-center justify-start gap-2 p-2"
                onClick={() => {
                  const newCompleted = !task.completed;
                  toggleTaskCompleted({
                    taskId: task._id,
                    completed: newCompleted,
                  });
                  if (newCompleted) {
                    toast.success("Task complete");
                  } else {
                    toast.warning("Task incomplete");
                  }
                }}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={(checked) => {
                    if (typeof checked === "boolean") {
                      toggleTaskCompleted({
                        taskId: task._id,
                        completed: checked,
                      });
                      if (checked) {
                        toast.success("Task complete");
                      } else {
                        toast.warning("Task incomplete");
                      }
                    }
                  }}
                />
                <p
                  className={cn(
                    task.completed
                      ? "text-muted-foreground line-through"
                      : null,
                  )}
                >
                  {task.taskTitle}
                </p>
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => {
                  deleteTask({ taskId: task._id });
                  toast.error("Task deleted");
                }}
                className="group ml-auto"
                size={"icon"}
              >
                <Trash2 className="group-hover:text-destructive size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
