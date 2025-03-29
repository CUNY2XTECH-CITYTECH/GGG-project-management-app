"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCategory } from "types/projects";

interface CategoriesSidebarProps {
  categories: ProjectCategory[];
  activeCategory: string;
  activeSubCategory: string;
  setActiveCategory: (id: string) => void;
  setActiveSubCategory: (id: string) => void;
}

export default function CategoriesSidebar({
  categories,
  activeCategory,
  activeSubCategory,
  setActiveCategory,
  setActiveSubCategory,
}: CategoriesSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={`${
        isExpanded ? "w-[240px]" : "w-[80px]"
      } bg-gray-950 border-r border-gray-800 overflow-y-auto transition-all duration-300`}
    >
      <div className="p-3 space-y-4 mt-12">
        <div className="flex items-center justify-between mb-4 gap-4">
          <h2
            className={`font-semibold ${
              isExpanded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            Projects
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
          </button>
        </div>

        {categories.map((category) => (
          <div key={category.id} className="space-y-2 ">
            <button
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-purple-600/10 text-purple-500 border-l-4 border-purple-600"
                  : "hover:bg-gray-900/50 text-gray-400 hover:text-white border-l-4 border-transparent"
              }`}
            >
              <div
                className={`p-1.5 ${
                  activeCategory === category.id
                    ? "bg-purple-600/20"
                    : "bg-gray-800"
                } rounded-lg`}
              >
                {category.icon}
              </div>
              {isExpanded && <span className="text-sm">{category.name}</span>}
            </button>

            {/* Sub-categories */}
            {isExpanded &&
              activeCategory === category.id &&
              category.subCategories && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 space-y-1 mt-1"
                >
                  {category.subCategories.map((subCategory) => (
                    <button
                      key={subCategory.id}
                      onClick={() => setActiveSubCategory(subCategory.id)}
                      className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-all duration-200 ${
                        activeSubCategory === subCategory.id
                          ? "bg-purple-600/10 text-purple-500"
                          : "hover:bg-gray-900/50 text-gray-400 hover:text-white"
                      }`}
                    >
                      <div
                        className={`p-1.5 ${
                          activeSubCategory === subCategory.id
                            ? "bg-purple-600/20"
                            : "bg-gray-800"
                        } rounded-lg`}
                      >
                        {subCategory.icon}
                      </div>
                      <span className="text-sm">{subCategory.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
