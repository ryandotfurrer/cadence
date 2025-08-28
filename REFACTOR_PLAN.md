w# All-Tasks Page Refactoring Plan

## Overview
Refactor the all-tasks page by extracting logic into reusable components and custom hooks to improve code organization and reusability.

## Components to Create

### 1. TaskForm Component (`components/task-form.tsx`)
- **Current**: Already exists but needs to be enhanced
- **Enhancements**: 
  - Add proper TypeScript interfaces
  - Make it more reusable with props for different use cases
  - Add validation and error handling

### 2. TaskList Component (`components/task-list.tsx`)
- **Purpose**: Render a list of tasks with completion toggle and delete functionality
- **Props**: 
  - `tasks`: Array of tasks
  - `onTaskCompleted`: Callback for task completion
  - `onTaskDeleted`: Callback for task deletion
  - `emptyMessage`: Message to show when no tasks
  - `showDeleteButton`: Boolean to control delete button visibility

### 3. TaskItem Component (`components/task-item.tsx`)
- **Purpose**: Individual task item with completion toggle and delete
- **Props**:
  - `task`: Task object
  - `onCompleted`: Callback for completion toggle
  - `onDeleted`: Callback for deletion
  - `showDeleteButton`: Boolean to control delete button

## Custom Hooks to Create

### 1. useTasks Hook (`hooks/use-tasks.ts`)
- **Purpose**: Centralize all task-related operations
- **Features**:
  - Query tasks for current user
  - Create, delete, toggle completion
  - Filter tasks (current vs previous)
  - Loading states
  - Error handling

### 2. useTaskAudio Hook (`hooks/use-task-audio.ts`)
- **Purpose**: Handle all audio-related functionality
- **Features**:
  - Initialize audio refs
  - Play completion, incompletion, and delete sounds
  - Error handling for audio failures
  - Preload audio files

### 3. useTaskFilters Hook (`hooks/use-task-filters.ts`)
- **Purpose**: Handle task filtering logic
- **Features**:
  - Filter current vs previous tasks
  - Date-based filtering logic
  - Reusable filtering functions

## File Structure After Refactoring

```
components/
├── task-form.tsx (enhanced)
├── task-list.tsx (new)
├── task-item.tsx (new)
└── ui/ (existing)

hooks/
├── use-tasks.ts (new)
├── use-task-audio.ts (new)
└── use-task-filters.ts (new)

app/(dashboard)/dashboard/(tasks)/tasks/all-tasks/
└── page.tsx (simplified)
```

## Benefits of This Refactoring

1. **Reusability**: Components can be used in other task-related pages
2. **Maintainability**: Logic is separated and easier to maintain
3. **Testability**: Individual components and hooks can be tested separately
4. **Cleaner Code**: Main page becomes much more readable
5. **Separation of Concerns**: UI, business logic, and data fetching are separated

## What We've Accomplished

✅ **Custom Hooks Created:**
- `useTasks`: Centralizes all task operations (CRUD, loading states, error handling)
- `useTaskAudio`: Handles audio functionality with error handling
- `useTaskFilters`: Manages task filtering logic (current vs previous)

✅ **Components Created:**
- `TaskItem`: Individual task item with completion toggle and delete
- `TaskList`: Renders task lists with empty state handling
- `TaskForm`: Enhanced to be more generic and reusable

✅ **Main Page Refactored:**
- Reduced from ~249 lines to ~95 lines (62% reduction)
- Much cleaner and more readable
- All business logic moved to custom hooks
- All UI rendering moved to reusable components

## Implementation Order

1. ✅ Create custom hooks first (useTasks, useTaskAudio, useTaskFilters)
2. ✅ Create TaskItem component
3. ✅ Create TaskList component
4. ✅ Enhance TaskForm component
5. ✅ Refactor main page to use new components and hooks
6. 🔄 Test and verify functionality

## Questions for Clarification

1. Should the TaskForm component be completely generic or specific to task creation?
2. Do you want the audio functionality to be optional/configurable?
3. Should the filtering logic be configurable (e.g., different date ranges)?
4. Are there any specific styling requirements for the new components?
5. Should we add any additional features while refactoring (e.g., task search, sorting)?
