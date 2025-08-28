"use client";

import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserContext } from "@/components/user-context";
import { useTaskAudio } from "@/hooks/use-task-audio";
import { useTaskFilters } from "@/hooks/use-task-filters";
import { useTasks } from "@/hooks/use-tasks";
import { useState } from "react";

export default function AllTasksPage() {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  // Use cached user context instead of repeated authentication checks
  const { user, isLoaded, isAuthenticated } = useUserContext();

  // Use custom hooks for task operations and filtering
  const { tasks, createTask, toggleTaskCompleted, deleteTask, isLoading } =
    useTasks(user?.id);
  const { currentTasks, previousTasks } = useTaskFilters(tasks);
  const { playCompletedSound, playIncompletedSound, playDeleteSound } =
    useTaskAudio();

  // Show loading state while user context is being established
  if (!isLoaded) {
    return (
      <hgroup className="space-y-2 py-4">
        <h2 className="font-cal text-3xl">Inbox</h2>
        <p className="text-muted-foreground">
          Your inbox shows you all tasks that are incomplete or do not have a
          due date.
        </p>
        <p>Loading...</p>
      </hgroup>
    );
  }

  // This should never happen due to AuthGuard, but good to have as fallback
  if (!isAuthenticated || !user) {
    return (
      <hgroup className="space-y-2 py-4">
        <h2 className="font-cal text-3xl">Inbox</h2>
        <p className="text-muted-foreground">
          Your inbox shows you all tasks that are incomplete or do not have a
          due date.
        </p>
        <p>Authentication required.</p>
      </hgroup>
    );
  }

  // Show loading state while tasks are being fetched
  if (isLoading) {
    return (
      <hgroup className="space-y-2 py-4">
        <h2 className="font-cal text-3xl">Inbox</h2>
        <p className="text-muted-foreground">
          Your inbox shows you all tasks that are incomplete or do not have a
          due date.
        </p>
        <p>Loading tasks...</p>
      </hgroup>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createTask(taskTitle, taskDescription || undefined);
    if (success) {
      setTaskTitle("");
      setTaskDescription("");
    }
  };

  const handleTaskCompleted = async (task: any) => {
    const newCompleted = await toggleTaskCompleted(task);
    if (newCompleted !== undefined) {
      if (newCompleted) {
        await playCompletedSound();
      } else {
        await playIncompletedSound();
      }
    }
  };

  const handleTaskDeleted = async (taskId: any) => {
    const success = await deleteTask(taskId);
    if (success) {
      await playDeleteSound();
    }
  };

  return (
    <div className="flex flex-1 w-full">
      <div className="w-3/4">
        <hgroup className="space-y-2 py-4">
          <h2 className="font-cal text-3xl">Inbox</h2>
          <p className="text-muted-foreground">
            Your inbox shows you all tasks that are incomplete or do not have a
            due date.
          </p>
        </hgroup>

        <div className="mb-8">
          <TaskForm
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            onSubmit={handleSubmit}
          />
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Tasks</TabsTrigger>
            <TabsTrigger value="previous">Past Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-6">
            <TaskList
              tasks={currentTasks}
              onTaskCompleted={handleTaskCompleted}
              onTaskDeleted={handleTaskDeleted}
              emptyMessage="No current tasks! Create one above or complete some tasks today."
            />
          </TabsContent>

          <TabsContent value="previous" className="mt-6">
            <TaskList
              tasks={previousTasks}
              onTaskCompleted={handleTaskCompleted}
              onTaskDeleted={handleTaskDeleted}
              emptyMessage="No past tasks completed yet. Keep up the great work!"
              showTaskDescription={false}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className="outline flex flex-1 px-4">
        <p>additional sidebar</p>
      </div>
    </div>
  );
}
