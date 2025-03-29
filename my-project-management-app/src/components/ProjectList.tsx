import React from 'react';

interface Project {
    project_id: number;
    project_name: string;
    description?: string;
    created_by: string;
    due_date?: string;
    status?: string;
}

interface ProjectListProps {
    projects: {
        "to-do": Project[];
        "in-progress": Project[];
        "done": Project[];
    };
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    // Helper function to get card color based on the status
    const getStatusClass = (status: string) => {
        switch (status) {
            case "to-do":
                return "bg-blue-100 border-blue-500";
            case "in-progress":
                return "bg-yellow-100 border-yellow-500";
            case "done":
                return "bg-green-100 border-green-500";
            default:
                return "bg-gray-100 border-gray-500";
        }
    };

    return (
        <div className="flex space-x-6 overflow-x-auto py-8">
            {["to-do", "in-progress", "done"].map((status) => (
                <div key={status} className="flex-shrink-0 w-1/3">
                    <h2 className="text-xl font-bold text-center text-gray-700 mb-4 capitalize">
                        {status.replace("-", " ")}
                    </h2>
                    <div className="space-y-4">
                        {projects[status]?.length === 0 ? (
                            <p className="text-center text-gray-500">No projects in this category.</p>
                        ) : (
                            projects[status]?.map((project) => (
                                <div
                                    key={project.project_id}
                                    className={`p-4 rounded-lg border-l-4 ${getStatusClass(status)} shadow-md`}
                                >
                                    <h3 className="text-lg font-semibold">{project.project_name}</h3>
                                    {project.due_date && (
                                        <p className="text-sm text-gray-500">Due: {project.due_date}</p>
                                    )}
                                    {project.description && <p className="mt-2">{project.description}</p>}
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className="text-sm text-gray-500">{`Created by: ${project.created_by}`}</span>
                                        {/* Example: Add an edit button */}
                                        <button className="text-blue-500">Edit</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectList;
