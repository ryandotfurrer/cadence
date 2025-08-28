import { useMemo } from "react";
import type { Doc } from "../convex/_generated/dataModel";

export const useTaskFilters = (tasks: Doc<"tasks">[] | undefined) => {
  // Helper function to check if a task was completed today or later
  const isCompletedTodayOrLater = (task: Doc<"tasks">) => {
    if (!task.completed || !task.completionTime) return false;
    const taskDate = new Date(task.completionTime);
    const today = new Date();
    
    // Set both dates to start of day for accurate comparison
    const taskStartOfDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
    const todayStartOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Task is "current" if completed today or later (future dates would be included)
    return taskStartOfDay >= todayStartOfDay;
  };

  // Filter tasks based on completion status and date
  const currentTasks = useMemo(() => 
    tasks?.filter((task) => !task.completed || isCompletedTodayOrLater(task)) || [],
    [tasks]
  );

  const previousTasks = useMemo(() => 
    tasks?.filter((task) => task.completed && !isCompletedTodayOrLater(task)) || [],
    [tasks]
  );

  return {
    currentTasks,
    previousTasks,
    isCompletedTodayOrLater,
  };
};
