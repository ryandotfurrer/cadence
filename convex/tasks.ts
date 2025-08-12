import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("tasks")
      .withIndex("byUserId", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const createTask = mutation({
  args: {
    userId: v.string(),
    taskTitle: v.string(),
    taskDescription: v.optional(v.string()),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("tasks", {
      userId: args.userId,
      taskTitle: args.taskTitle,
      taskDescription: args.taskDescription,
      completed: args.completed,
    });
    return newTaskId;
  },
});

export const deleteTask = mutation({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.taskId);
  },
});

export const toggleTaskCompleted = mutation({
  args: {
    taskId: v.id("tasks"),
    completed: v.boolean(),
  },
  handler: async (ctx, { taskId, completed }) => {
    await ctx.db.patch(taskId, {
      completed,
    });
  },
});
