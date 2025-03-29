"use client";

import { useDrop } from "react-dnd";
import { useRef, useEffect, useCallback, useState } from "react";
import TaskItem from "./TaskItem";
import { Task } from "types/projects";
import { FiPlus } from "react-icons/fi";

interface TaskSectionProps {
  title: string;
  sectionId: string;
  tasks: Task[];
  toggleTaskStatus: (sectionId: string, taskId: string) => void;
  moveTask: (taskId: string, fromSection: string, toSection: string) => void;
  allSections: string[];
  viewMode: "grid" | "list";
  deleteTask: (sectionId: string, taskId: string) => void;
}

export default function TaskSection({
  title,
  sectionId,
  tasks,
  toggleTaskStatus,
  moveTask,
  allSections,
  viewMode,
  deleteTask,
}: TaskSectionProps) {
  const dropRef = useRef(null);
  const [isToggling, setIsToggling] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: string; sectionId: string }) => {
      if (item.sectionId !== sectionId) {
        moveTask(item.id, item.sectionId, sectionId);
      }
      return { name: sectionId };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Connect the drop ref to our element
  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef);
    }
  }, [drop, dropRef]);

  // Handle task status toggle
  const handleToggleStatus = (taskId: string) => {
    // Direct call without debounce
    toggleTaskStatus(sectionId, taskId);
  };

  // Handle task deletion
  const handleDeleteTask = (taskId: string) => {
    deleteTask(sectionId, taskId);
  };

  return (
    <div
      ref={dropRef}
      className={`${
        viewMode === "grid" ? "bg-gray-900/30 p-4 rounded-lg" : ""
      } ${
        isOver
          ? "bg-purple-900/20 border border-purple-500/30"
          : viewMode === "grid"
          ? "border border-gray-800"
          : ""
      } transition-colors`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-medium text-white">{title}</h2>
          <span className="text-sm text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>
      <div className={`${viewMode === "list" ? "space-y-2" : "space-y-3"}`}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            sectionId={sectionId}
            toggleStatus={() => handleToggleStatus(task.id)}
            viewMode={viewMode}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}
        {tasks.length > 0 && <hr className="border-gray-800 mt-2" />}
      </div>
    </div>
  );
}
