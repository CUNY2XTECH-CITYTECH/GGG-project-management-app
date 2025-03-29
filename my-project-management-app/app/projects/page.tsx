"use client";

import { useEffect, useState } from "react";
import CategoriesSidebar from "app/projects/components/projects/CategoriesSidebar";
import ProjectContent from "app/projects/components/projects/ProjectContent";
import Sidebar from "app/projects/components/projects/Sidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  FiGrid,
  FiCalendar,
  FiBarChart2,
  FiUsers,
  FiFlag,
  FiStar,
  FiDollarSign,
} from "react-icons/fi";
import { ProjectCategory, Task } from "types/projects";

// Initial tasks data
const initialTasks: { [key: string]: Task[] } = {
  design: [
    {
      id: "1",
      title: "Define color scheme & typography",
      status: "done",
      dueDate: "Mar 23",
      assignee: "User 1",
      assigneeAvatar: "/user4.avif",
    },
    {
      id: "2",
      title: "Design homepage",
      status: "done",
      dueDate: "Mar 28",
      assignee: "User 2",
      assigneeAvatar: "/user4.avif",
    },
    {
      id: "3",
      title: "Design responsive layouts for mobile and tablet views",
      status: "in progress",
      dueDate: "Apr 12",
      assignee: "User 3",
      assigneeAvatar: "/user3.jpeg",
    },
    {
      id: "4",
      title: "Implement navigation with dropdowns",
      status: "in progress",
      dueDate: "Apr 18",
      assignee: "User 4",
      assigneeAvatar: "/user4.avif",
    },
  ],
  seo: [
    {
      id: "7",
      title: "Research and integrate relevant keywords",
      status: "done",
      dueDate: "Mar 21",
      assignee: "User 1",
      assigneeAvatar: "/user4.avif",
    },
    {
      id: "8",
      title: "Ensure all pages have meta titles and descriptions",
      status: "in progress",
      dueDate: "Apr 12",
      assignee: "User 1",
      assigneeAvatar: "/user4.avif",
    },
    {
      id: "9",
      title: "Set up Google Analytics",
      status: "done",
      dueDate: "Mar 29",
      assignee: "User 2",
      assigneeAvatar: "/user4.avif",
    },
  ],
  testing: [
    {
      id: "10",
      title: "Conduct usability testing with a small group of users",
      status: "in progress",
      dueDate: "Apr 28",
      assignee: "User 1",
      assigneeAvatar: "/user3.jpeg",
    },
    {
      id: "11",
      title: "Test on different devices and browses for compatibility",
      status: "in progress",
      dueDate: "Apr 20",
      assignee: "User 4",
      assigneeAvatar: "/user3.jpeg",
    },
  ],
};

export default function ProjectsPage() {
  // State for active category
  const [activeCategory, setActiveCategory] = useState<string>("marketing");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("website");

  // State for tasks
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>(initialTasks);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("projectTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Project categories data
  const projectCategories: ProjectCategory[] = [
    {
      id: "marketing",
      name: "Marketing",
      icon: <FiFlag />,
      subCategories: [
        { id: "website", name: "Website", icon: <FiGrid /> },
        {
          id: "holiday-campaign",
          name: "Holiday Campaign",
          icon: <FiCalendar />,
        },
        { id: "seo", name: "SEO", icon: <FiBarChart2 /> },
        { id: "collaborations", name: "Collaborations", icon: <FiUsers /> },
      ],
    },
    {
      id: "product",
      name: "Product",
      icon: <FiStar />,
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: <FiBarChart2 />,
    },
    {
      id: "finances",
      name: "Finances",
      icon: <FiDollarSign />,
    },
  ];

  // Function to handle task status toggle
  const toggleTaskStatus = (sectionId: string, taskId: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      const taskIndex = updatedTasks[sectionId].findIndex(
        (task) => task.id === taskId
      );

      if (taskIndex !== -1) {
        const task = updatedTasks[sectionId][taskIndex];
        updatedTasks[sectionId][taskIndex] = {
          ...task,
          status: task.status === "done" ? "in progress" : "done",
        };
      }

      // Save to localStorage
      localStorage.setItem("projectTasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // Function to handle task movement between sections
  const moveTask = (taskId: string, fromSection: string, toSection: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      const taskIndex = updatedTasks[fromSection].findIndex(
        (task) => task.id === taskId
      );

      if (taskIndex !== -1) {
        const [task] = updatedTasks[fromSection].splice(taskIndex, 1);
        updatedTasks[toSection] = [...updatedTasks[toSection], task];
      }

      // Save to localStorage
      localStorage.setItem("projectTasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex bg-black text-white h-screen">
        <Sidebar />
        <CategoriesSidebar
          categories={projectCategories}
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          setActiveCategory={setActiveCategory}
          setActiveSubCategory={setActiveSubCategory}
        />
        <ProjectContent
          tasks={tasks}
          toggleTaskStatus={toggleTaskStatus}
          moveTask={moveTask}
        />
      </div>
    </DndProvider>
  );
}