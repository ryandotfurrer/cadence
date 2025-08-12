"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useQuery,
  useMutation,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  return (
    <>
      <Authenticated>
        {/*<UserButton />*/}
        <Content />
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </>
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

  const handleSubmit = async (e: any) => {
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

  if (tasks.length === 0) {
    return (
      <>
        <h2 className="mb-12 text-5xl font-bold tracking-tight">
          Good Morning, {user?.firstName}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
        <p className="my-12">No tasks found.</p>
      </>
    );
  }

  return (
    <>
      <h2 className="mb-12 text-5xl font-bold tracking-tight">
        Good Morning, {user?.firstName}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
      <div className="my-12 grid gap-y-2">
        {tasks.map((task) => (
          <div key={task._id} className="flex items-center gap-2">
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
                task.completed ? "text-muted-foreground line-through" : null,
              )}
            >
              {task.taskTitle}
            </p>
            <Button
              variant={"destructive"}
              onClick={() => {
                deleteTask({ taskId: task._id });
                toast.error("Task deleted");
              }}
              className="ml-auto"
              size={"icon"}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
