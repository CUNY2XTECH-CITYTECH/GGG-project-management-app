"use client";

import { useDrag } from "react-dnd";
import { Task } from "types/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import React from "react";

interface TaskItemProps {
  task: Task;
  sectionId: string;
  toggleStatus: () => void;
  viewMode: "grid" | "list";
  onDelete: () => void;
}

export default React.memo(function TaskItem({
  task,
  sectionId,
  toggleStatus,
  viewMode,
  onDelete,
}: TaskItemProps) {
  const dragRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, sectionId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Connect the drag ref to our element
  useEffect(() => {
    if (dragRef.current) {
      drag(dragRef);
    }
  }, [drag, dragRef]);

  // Simplified toggle handler - just stop propagation and call the toggle function
  const handleStatusToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleStatus();
  };

  // Simplified delete handler
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <motion.div
      ref={dragRef}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex relative ${
        viewMode === "list" ? "items-center justify-between" : "flex-col"
      } py-2 px-3 rounded-lg bg-transparent hover:bg-gray-900/50 transition-colors cursor-move ${
        isDragging ? "opacity-50 border border-purple-500/50" : "opacity-100"
      } ${viewMode === "grid" ? "h-full" : ""} group`}
    >
      <div
        className={`flex ${
          viewMode === "grid"
            ? "flex-col space-y-2 w-full"
            : "items-center space-x-3"
        }`}
      >
        <div
          className={`${
            viewMode === "grid"
              ? "flex items-center justify-between w-full"
              : "flex items-center"
          }`}
        >
          <button
            onClick={handleStatusToggle}
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors mr-3 ${
              task.status === "done"
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "border-2 border-gray-700 hover:border-purple-500"
            }`}
          >
            {task.status === "done" && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <span
            className={`${
              task.status === "done"
                ? "line-through text-gray-500"
                : "text-white"
            } text-sm `}
          >
            {task.title}
          </span>

          {viewMode === "grid" && (
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs min-w-[80px] text-center ${
                task.status === "done"
                  ? "bg-gray-700 text-gray-300"
                  : "bg-amber-900/30 text-amber-500"
              }`}
            >
              {task.status === "done" ? "Done" : "In progress"}
            </span>
          )}
        </div>

        {viewMode === "grid" && (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">{task.dueDate}</span>

            <div className=" rounded-full  overflow-hidden flex items-center justify-center gap-2">
              <Image
                src={task.assigneeAvatar}
                alt="Assignee Avatar"
                width={24}
                height={24}
                className="rounded-full"
              />
              <button
                onClick={handleDelete}
                className=" p-1.5 rounded-full bg-red-500/40 text-red-400 hover:bg-red-500/40 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Delete task"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {viewMode === "list" && (
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-400">{task.dueDate}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              task.status === "done"
                ? "bg-gray-700 text-gray-300"
                : "bg-amber-900/30 text-amber-500"
            }`}
          >
            {task.status === "done" ? "Done" : "In progress"}
          </span>
          <div className="rounded-full  overflow-hidden flex items-center justify-center gap-2">
            <Image
              src={task.assigneeAvatar}
              alt="Assignee Avatar"
              width={24}
              height={24}
              className="rounded-full"
            />
            <button
              onClick={handleDelete}
              className=" p-1.5 rounded-full bg-red-500/40 text-red-400 hover:bg-red-500/40 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Delete task"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Delete button - visible on hover or focus */}
    </motion.div>
  );
});
