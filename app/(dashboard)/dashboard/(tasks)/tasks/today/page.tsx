"use client"

import { TaskForm } from "@/components/task-form"
import { useState } from "react";

export default function TodayTasksPage() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Task submitted:", taskTitle, taskDescription, dueDate);
  };

  return (
    <div className="py-4">
      <h2 className="text-3xl font-cal">Today's Tasks</h2>
      <div className="mb-8">
        <TaskForm
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
