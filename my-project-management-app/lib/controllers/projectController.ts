import { createProject, getProjectById, updateProject, deleteProject, getAllProjects } from '../queries/projects';
import { ProjectData } from '../queries/projects'; // Adjust the import based on your project structure

// Create a new project
export const createNewProject = async (projectId: string, projectName: string, description: string, createdBy: string) => {
    try {
        const project = await createProject({ project_name: projectName, description, created_by: createdBy });
        return { status: 201, data: project }; // Return status and project data
    } catch (error) {
        return { status: 500, message: (error as Error).message }; // Handle errors
    }
};

// Get project by ID
export const getProject = async (projectId: string) => {
    try {
        const project = await getProjectById(parseInt(projectId));
        if (!project) {
            return { status: 404, message: 'Project not found' }; // Handle not found
        }
        return { status: 200, data: project }; // Return status and project data
    } catch (error) {
        return { status: 500, message: (error as Error).message }; // Handle errors
    }
};

// Update project
export const updateExistingProject = async (projectId: string, projectName?: string, description?: string, createdBy?: string) => {
    try {
        const updateData: { project_name: string; description?: string; created_by: string } = {
            project_name: projectName || '', // Ensure project_name is included
            created_by: createdBy || '', // Ensure created_by is included
        };

        if (projectName) {
            updateData.project_name = projectName; // Only add if defined
        }

        if (description) {
            updateData.description = description; // Only add if defined
        }

        const updatedProject = await updateProject(parseInt(projectId), updateData);
        return { status: 200, data: updatedProject }; // Return status and updated project data
    } catch (error) {
        return { status: 500, message: (error as Error).message }; // Handle errors
    }
};

// Delete project
export const deleteExistingProject = async (projectId: string) => {
    try {
        await deleteProject(parseInt(projectId));
        return { status: 204 }; // No content
    } catch (error) {
        return { status: 500, message: (error as Error).message }; // Handle errors
    }
};

// Get all projects
export const getAllProjectsController = async () => {
    try {
        const rawProjects = await getAllProjects(); // Get raw projects data
        const projects: ProjectData[] = rawProjects.map(project => ({
            project_id: project.project_id,
            project_name: project.project_name,
            description: project.description ?? undefined, // Convert null to undefined
            created_by: project.created_by,
            start_date: project.start_date ?? undefined, // Convert null to undefined
            due_date: project.due_date ?? undefined, // Convert null to undefined
            status: project.status ?? undefined, // Convert null to undefined
        }));
        return { status: 200, data: projects };
    } catch (error) {
        return { status: 500, message: (error as Error).message }; // Handle errors
    }
};
