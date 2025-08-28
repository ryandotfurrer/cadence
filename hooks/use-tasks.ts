import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import type { Doc } from "../convex/_generated/dataModel";
import { toast } from "sonner";

export const useTasks = (userId: string | undefined) => {
  // Query tasks for current user
  const tasks = useQuery(api.tasks.getForCurrentUser, {});
  
  // Mutations
  const createTask = useMutation(api.tasks.createTask);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const toggleTaskCompleted = useMutation(api.tasks.toggleTaskCompleted);

  // Create a new task
  const handleCreateTask = async (
    taskTitle: string, 
    taskDescription?: string
  ) => {
    if (!userId) return;
    
    try {
      await createTask({
        userId,
        taskTitle,
        taskDescription,
        completed: false,
      });
      return true;
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task");
      return false;
    }
  };

  // Toggle task completion
  const handleToggleTaskCompleted = async (task: Doc<"tasks">) => {
    try {
      const newCompleted = !task.completed;
      await toggleTaskCompleted({
        taskId: task._id,
        completed: newCompleted,
      });
      
      if (newCompleted) {
        toast.success("Task complete");
      } else {
        toast.warning("Task incomplete");
      }
      
      return newCompleted;
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
      toast.error("Failed to update task");
      return task.completed; // Return original state on error
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId: Doc<"tasks">["_id"]) => {
    try {
      await deleteTask({ taskId });
      toast.error("Task deleted");
      return true;
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task");
      return false;
    }
  };

  return {
    // Data
    tasks,
    
    // Actions
    createTask: handleCreateTask,
    toggleTaskCompleted: handleToggleTaskCompleted,
    deleteTask: handleDeleteTask,
    
    // Loading states
    isLoading: tasks === undefined,
  };
};
