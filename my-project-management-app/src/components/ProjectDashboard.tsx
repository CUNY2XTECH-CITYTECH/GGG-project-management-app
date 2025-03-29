import React, { useEffect, useState } from "react";
import ProjectList from "./ProjectList";

interface ProjectData {
    project_id: number;
    project_name: string;
    description?: string;
    created_by: string;
    due_date?: string;
    status?: string;
}

const ProjectsDashboard: React.FC<{ userId: string }> = ({ userId }) => {
    const [projects, setProjects] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`/api/projects/by-user?userId=${userId}`);
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [userId]);

    if (loading) return <p>Loading projects...</p>;

    return <ProjectList projects={projects} />;
};

export default ProjectsDashboard;
