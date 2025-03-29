import db from '../db'; // Import the database connection
import { tasks } from '../database-schema/schema'; // Import the tasks schema
import { eq } from 'drizzle-orm/expressions'; // Import the eq function

// Define the TaskData interface
interface TaskData {
    task_name: string | ""; // Name of the task
    description?: string; // Optional description
    project_id: number; // ID of the project
    assigned_to?: string; // Optional assigned to
    priority?: string; // Optional priority
    due_date?: Date; // Optional due date
    status?: string; // Optional status
}

// Get all tasks
export const getAllTasks = async (projectId: number) => {
    try {
        const taskList = await db.select().from(tasks).where(eq(tasks.project_id, projectId)).execute();
        return taskList;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Could not retrieve tasks.');
    }
}

// Get a single task by task_id
export const getTaskById = async (taskId: number) => {
    try {
        const task = await db
            .select()
            .from(tasks)
            .where(eq(tasks.task_id, taskId)) // Use the eq function for comparison
            .execute();
        return task[0]; // Return the first task found
    } catch (error) {
        console.error('Error fetching task:', error);
        throw new Error('Could not retrieve task.');
    }
}

// Create a new task
export const createTask = async (taskData: TaskData) => {
    try {
        const task = await db.insert(tasks).values(taskData);
        return task;
    } catch (error) {
        console.error('Error creating task:', error);
        throw new Error('Could not create task.');
    }
}

// Update an existing task
export const updateTask = async (taskId: number, taskData: TaskData) => {
    try {
        const updatedTask = await db
            .update(tasks)
            .set(taskData)
            .where(eq(tasks.task_id, taskId)) // Use the eq function for comparison
            .execute();
        return updatedTask;
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Could not update task.');
    }
}

// Delete a task
export const deleteTask = async (taskId: number) => {
    try {
        await db.delete(tasks).where(eq(tasks.task_id, taskId)).execute();
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('Could not delete tasks.');
    }
}