import { createTask, getTaskById, updateTask, deleteTask, getAllTasks } from '../queries/tasks'; // Adjust the import based on your project structure

// Create a new task
export const createNewTask = async (taskId: number, taskName: string, description: string, projectId: number, assignedTo?: string) => {
    try {
        const task = await createTask({ 
            task_id: taskId, // Pass task_id as a number
            task_name: taskName, 
            description, 
            project_id: projectId, // Pass project_id as a number
            assigned_to: assignedTo 
        });
        return { status: 201, data: task }; // Return status and task data
    } catch (error) {
        return { status: 500, message: (error as Error).message }; // Handle errors
    }
};

// Get task by ID
export const getTask = async (taskId: number) => {
    try {
        const task = await getTaskById(taskId);
        if (!task) {
            return { status: 404, message: 'Task not found' }; // Handle not found
        }
        return { status: 200, data: task }; // Return status and task data
    } catch (error) {
        return { status: 500, message: (error as Error).message }; // Handle errors
    }
};

// Update existing task
export const updateExistingTask = async (taskId: number, taskName?: string, description?: string, projectId?: number, assignedTo?: string) => {
    try {
        // Create an object to hold only the fields that can be updated
        const updateData: { task_id: number; task_name: string; description?: string; project_id?: number; assigned_to?: string } = {
            task_id: taskId, // Include task_id
            task_name: taskName ?? '', // Use an empty string if taskName is undefined
            description: description,
            project_id: projectId,
            assigned_to: assignedTo
        };

        // Call updateTask with the complete updateData
        const updatedTask = await updateTask(taskId, updateData);
        return { status: 200, data: updatedTask }; // Return status and updated task data
    } catch (error) {
        return { status: 500, message: (error as Error).message }; // Handle errors
    }
};

// Delete task
export const deleteExistingTask = async (taskId: number) => {
    try {
        await deleteTask(taskId);
        return { status: 204 }; // No content
    } catch (error) {
        return { status: 500, message: (error as Error).message }; // Handle errors
    }
};

// Get all tasks for a project
export const getAllTasksForProject = async (projectId: number) => {
    try {
        const tasks = await getAllTasks(projectId); // Assuming this function retrieves tasks for a specific project
        return { status: 200, data: tasks }; // Return status and tasks data
    } catch (error) {
        return { status: 500, message: (error as Error).message }; // Handle errors
    }
};
