import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    userId: v.string(),
    taskTitle: v.string(),
    taskDescription: v.optional(v.string()),
    completed: v.boolean(),
  }).index("byUserId", ["userId"]),
});
