import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Management Dashboard",
  description: "Manage your projects and tasks efficiently",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      {children}
    </div>
  );
} 