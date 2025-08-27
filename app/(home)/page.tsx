"use client";

import { Greeting } from "@/components/Greeting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { AudioWaveform, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";

export default function Home() {
  return (
    <>
      <Authenticated>
        <Button asChild>
          <SignOutButton />
        </Button>
        <Content />
      </Authenticated>
      <Unauthenticated>
        <p>You're not signed in.</p>
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
  
  // Create audio refs that persist across renders
  const completedTaskAudioRef = useRef<HTMLAudioElement | null>(null);
  const incompletedTaskAudioRef = useRef<HTMLAudioElement | null>(null);
  const deleteTaskAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio objects once when component mounts
  useEffect(() => {
    try {
      completedTaskAudioRef.current = new Audio("/assets/sounds/task-complete.mp3");
      incompletedTaskAudioRef.current = new Audio("/assets/sounds/task-incomplete.mp3");
      deleteTaskAudioRef.current = new Audio("/assets/sounds/task-delete.mp3");
      
      // Preload the audio files
      completedTaskAudioRef.current.load();
      incompletedTaskAudioRef.current.load();
      deleteTaskAudioRef.current.load();
    } catch (error) {
      console.warn("Failed to initialize audio:", error);
    }
  }, []);

  if (tasks === undefined) {
    return <p>Loading...</p>;
  }

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

  const handleTaskCompleted = async (task: any) => {
    const newCompleted = !task.completed;
    await toggleTaskCompleted({
      taskId: task._id,
      completed: newCompleted,
    });
    
    if (newCompleted) {
      toast.success("Task complete");
      // Play completion sound with error handling
      try {
        if (completedTaskAudioRef.current) {
          completedTaskAudioRef.current.currentTime = 0;
          await completedTaskAudioRef.current.play();
        }
      } catch (error) {
        console.warn("Failed to play completion audio:", error);
      }
    } else {
      toast.warning("Task incomplete");
      // Play incompletion sound with error handling
      try {
        if (incompletedTaskAudioRef.current) {
          incompletedTaskAudioRef.current.currentTime = 0;
          await incompletedTaskAudioRef.current.play();
        }
      } catch (error) {
        console.warn("Failed to play incompletion audio:", error);
      }
    }
  };

  const handleTaskDeleted = async (taskId: any) => {
    await deleteTask({ taskId });
    toast.error("Task deleted");
    
    // Play delete sound with error handling
    try {
      if (deleteTaskAudioRef.current) {
        deleteTaskAudioRef.current.currentTime = 0;
        await deleteTaskAudioRef.current.play();
      }
    } catch (error) {
      console.warn("Failed to play delete audio:", error);
    }
  };



  return (
    <div className="container mx-auto flex flex-1 flex-col px-4">
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
                asChild
                variant="ghost"
                className="flex h-auto items-start justify-start gap-2 p-2 flex-1 whitespace-normal cursor-pointer"
                onClick={() => handleTaskCompleted(task)}
              >
                <p
                  className={cn(" flex-1 break-words",
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
                onClick={() => handleTaskDeleted(task._id)}
                className="group ml-auto"
                size={"icon"}
              >
                <Trash2 className="group-hover:text-destructive size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
