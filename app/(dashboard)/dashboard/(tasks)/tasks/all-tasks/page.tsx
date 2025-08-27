"use client";

import { TaskForm } from "@/components/task-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/components/user-context";
import { useMutation, useQuery } from "convex/react";
import { AudioWaveform, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { api } from "../../../../../../convex/_generated/api";
import type { Doc } from "../../../../../../convex/_generated/dataModel";

export default function AllTasksPage() {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const createTask = useMutation(api.tasks.createTask);
  const deleteTask = useMutation(api.tasks.deleteTask);
  
  // Use cached user context instead of repeated authentication checks
  const { user, isLoaded, isAuthenticated } = useUserContext();
  
  // Query tasks - authentication is guaranteed by AuthGuard
  const tasks = useQuery(api.tasks.getForCurrentUser, {});
  
  const toggleTaskCompleted = useMutation(api.tasks.toggleTaskCompleted);
  
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

  // Show loading state while user context is being established
  if (!isLoaded) {
    return (
      <div className="py-4">
        <h2 className="text-3xl font-cal mb-6">All Tasks</h2>
        <p>Loading...</p>
      </div>
    );
  }

  // This should never happen due to AuthGuard, but good to have as fallback
  if (!isAuthenticated || !user) {
    return (
      <div className="py-4">
        <h2 className="text-3xl font-cal mb-6">All Tasks</h2>
        <p>Authentication required.</p>
      </div>
    );
  }

  // Show loading state while tasks are being fetched
  if (tasks === undefined) {
    return (
      <div className="py-4">
        <h2 className="text-3xl font-cal mb-6">All Tasks</h2>
        <p>Loading tasks...</p>
      </div>
    );
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

  const handleTaskCompleted = async (task: Doc<"tasks">) => {
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

  const handleTaskDeleted = async (taskId: Doc<"tasks">["_id"]) => {
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
    <div className="py-4">
      <h2 className="text-3xl font-cal mb-6">All Tasks</h2>
      
      <div className="mb-8">
        <TaskForm
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          onSubmit={handleSubmit}
        />
      </div>

      {tasks.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center">
            <AudioWaveform className="text-muted mx-auto size-32 mb-4" />
            <p className="text-muted-foreground text-lg font-semibold">
              Woohoo! You've completed all your tasks
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task._id} className="flex items-center p-3">
              <Button
                asChild
                variant="ghost"
                className="flex justify-start flex-1 whitespace-normal cursor-pointer "
                onClick={() => handleTaskCompleted(task)}
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
              <Button
                variant="ghost"
                onClick={() => handleTaskDeleted(task._id)}
                className="group ml-auto hover:bg-destructive/10"
                size="icon"
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
