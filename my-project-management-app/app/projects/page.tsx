import React from 'react';
import ProjectsDashboard from '../../src/components/ProjectDashboard';

const ProjectsPage: React.FC = () => {
  // Assuming you have the user ID stored somewhere (e.g., in context or session)
  const userId = 'user-uuid'; // Replace with actual user ID retrieval

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold text-center py-8">Your Projects</h1>
      <ProjectsDashboard userId={userId} />
    </div>
  );
};

export default ProjectsPage;
