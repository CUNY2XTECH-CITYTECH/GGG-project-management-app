'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { FiGrid, FiList, FiPlus, FiTrash2 } from 'react-icons/fi';
import TaskSection from './TaskSection';
import { Task } from 'types/projects';

interface ProjectContentProps {
  tasks: { [key: string]: Task[] };
  toggleTaskStatus: (sectionId: string, taskId: string) => void;
  moveTask: (taskId: string, fromSection: string, toSection: string) => void;
}

export default function ProjectContent({
  tasks: initialTasks,
  toggleTaskStatus: initialToggleTaskStatus,
  moveTask: initialMoveTask,
}: ProjectContentProps) {
  // Task sections
  const taskSections = ['Design', 'SEO', 'Testing'];
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeTab, setActiveTab] = useState('tasks');

  // State for tasks with localStorage persistence
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>(initialTasks);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSection, setNewTaskSection] = useState('design');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState<'in progress' | 'done'>(
    'in progress'
  );

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('projectTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('projectTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add this at the top of your component
  const lastToggleTime = useRef<number | null>(null);

  // Function to handle task status toggle
  const toggleTaskStatus = useCallback((sectionId: string, taskId: string) => {
    // Simple direct implementation without debounce
    setTasks((prevTasks) => {
      // Create a deep copy to ensure we're not modifying the original state
      const updatedTasks = JSON.parse(JSON.stringify(prevTasks));

      // Ensure the section exists
      if (!updatedTasks[sectionId] || !Array.isArray(updatedTasks[sectionId])) {
        return prevTasks; // Return unchanged if section doesn't exist
      }

      // Find the task
      const taskIndex = updatedTasks[sectionId].findIndex(
        (task: Task) => task.id === taskId
      );

      // If task found, toggle its status
      if (taskIndex !== -1) {
        const currentStatus = updatedTasks[sectionId][taskIndex].status;
        const newStatus = currentStatus === 'done' ? 'in progress' : 'done';

        updatedTasks[sectionId][taskIndex].status = newStatus;

        console.log(`Task ${taskId} status changed to: ${newStatus}`);
        return updatedTasks;
      }

      return prevTasks; // Return unchanged if task not found
    });
  }, []);

  // Function to handle task movement between sections
  const moveTask = (taskId: string, fromSection: string, toSection: string) => {
    if (fromSection === toSection) return;

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      // Ensure both sections exist
      if (!updatedTasks[fromSection]) updatedTasks[fromSection] = [];
      if (!updatedTasks[toSection]) updatedTasks[toSection] = [];

      const taskIndex = updatedTasks[fromSection].findIndex(
        (task) => task.id === taskId
      );

      if (taskIndex !== -1) {
        // Remove from source section
        const [task] = updatedTasks[fromSection].splice(taskIndex, 1);

        // Add to target section
        updatedTasks[toSection] = [...updatedTasks[toSection], task];

        // Log for debugging
        console.log(`Moved task ${taskId} from ${fromSection} to ${toSection}`);
      }

      return updatedTasks;
    });
  };

  // Function to add a new task
  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: newTaskStatus,
      dueDate: newTaskDueDate || 'No date',
      assignee: 'You',
      assigneeAvatar: '/user4.avif',
    };

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (!updatedTasks[newTaskSection]) {
        updatedTasks[newTaskSection] = [];
      }
      updatedTasks[newTaskSection] = [...updatedTasks[newTaskSection], newTask];
      return updatedTasks;
    });

    // Reset form
    setNewTaskTitle('');
    setNewTaskDueDate('');
    setNewTaskStatus('in progress');
    setShowAddTaskModal(false);
  };

  // Function to delete a task
  const deleteTask = (sectionId: string, taskId: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      // Ensure the section exists
      if (!updatedTasks[sectionId]) {
        return updatedTasks;
      }

      const taskIndex = updatedTasks[sectionId].findIndex(
        (task) => task.id === taskId
      );

      if (taskIndex !== -1) {
        updatedTasks[sectionId].splice(taskIndex, 1);
        console.log(`Deleted task ${taskId} from ${sectionId}`);
      }

      return updatedTasks;
    });
  };

  // Add task modal
  const renderAddTaskModal = () => {
    if (!showAddTaskModal) return null;

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Add New Task
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Task Title</label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Section</label>
              <select
                value={newTaskSection}
                onChange={(e) => setNewTaskSection(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                {taskSections.map((section) => (
                  <option key={section} value={section.toLowerCase()}>
                    {section}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Status</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="taskStatus"
                    checked={newTaskStatus === 'in progress'}
                    onChange={() => setNewTaskStatus('in progress')}
                    className="text-purple-600 focus:ring-purple-600"
                  />
                  <span className="text-white">In Progress</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="taskStatus"
                    checked={newTaskStatus === 'done'}
                    onChange={() => setNewTaskStatus('done')}
                    className="text-purple-600 focus:ring-purple-600"
                  />
                  <span className="text-white">Done</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Due Date</label>
              <input
                type="text"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="e.g., Apr 30"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              onClick={() => setShowAddTaskModal(false)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addTask}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="text-gray-300">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>

            {/* Project stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Tasks Completed</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-white">24/36</p>
                  <p className="text-green-400 text-sm">67%</p>
                </div>
                <div className="w-full bg-gray-700 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-full rounded-full"
                    style={{ width: '67%' }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Time Spent</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-white">42h</p>
                  <p className="text-yellow-400 text-sm">+3h</p>
                </div>
                <div className="w-full bg-gray-700 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-yellow-500 h-full rounded-full"
                    style={{ width: '70%' }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Budget Used</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-white">$8,240</p>
                  <p className="text-blue-400 text-sm">82%</p>
                </div>
                <div className="w-full bg-gray-700 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: '82%' }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Days Remaining</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-red-400 text-sm">Critical</p>
                </div>
                <div className="w-full bg-gray-700 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full"
                    style={{ width: '20%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Project details and charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Project info */}
              <div className="bg-gray-800 p-5 rounded-lg col-span-1">
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Project Manager</p>
                    <div className="flex items-center mt-1">
                      <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white">
                        JD
                      </div>
                      <p className="ml-2 text-white">Jane Doe</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Client</p>
                    <p className="text-white">Acme Corporation</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Timeline</p>
                    <p className="text-white">Jan 15, 2023 - Mar 30, 2023</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Priority</p>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">
                      High
                    </span>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">
                      In Progress
                    </span>
                  </div>
                </div>
              </div>

              {/* Task completion chart */}
              <div className="bg-gray-800 p-5 rounded-lg col-span-2">
                <h3 className="text-lg font-semibold mb-4">Task Completion</h3>
                <div className="h-64 flex items-end justify-between px-2">
                  {/* Simulated chart bars */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 bg-purple-600 rounded-t"
                      style={{ height: '40%' }}
                    ></div>
                    <p className="text-xs text-gray-400 mt-2">Week 1</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 bg-purple-600 rounded-t"
                      style={{ height: '65%' }}
                    ></div>
                    <p className="text-xs text-gray-400 mt-2">Week 2</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 bg-purple-600 rounded-t"
                      style={{ height: '45%' }}
                    ></div>
                    <p className="text-xs text-gray-400 mt-2">Week 3</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 bg-purple-600 rounded-t"
                      style={{ height: '80%' }}
                    ></div>
                    <p className="text-xs text-gray-400 mt-2">Week 4</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 bg-purple-600 rounded-t"
                      style={{ height: '60%' }}
                    ></div>
                    <p className="text-xs text-gray-400 mt-2">Week 5</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 bg-purple-600 rounded-t"
                      style={{ height: '75%' }}
                    ></div>
                    <p className="text-xs text-gray-400 mt-2">Week 6</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 bg-purple-600 rounded-t"
                      style={{ height: '90%' }}
                    ></div>
                    <p className="text-xs text-gray-400 mt-2">Week 7</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 bg-gray-600 rounded-t"
                      style={{ height: '30%' }}
                    ></div>
                    <p className="text-xs text-gray-400 mt-2">Week 8</p>
                  </div>
                </div>
              </div>

              {/* Team members */}
              <div className="bg-gray-800 p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                <div className="space-y-3">
                  {[
                    'Alex Smith',
                    'Maria Garcia',
                    'John Lee',
                    'Sarah Johnson',
                  ].map((name, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white">
                          {name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <p className="ml-2 text-white">{name}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="bg-gray-800 p-5 rounded-lg col-span-2">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    {
                      user: 'Maria G.',
                      action: 'completed task',
                      item: 'Update homepage hero section',
                      time: '2 hours ago',
                    },
                    {
                      user: 'John L.',
                      action: 'commented on',
                      item: 'SEO optimization plan',
                      time: '4 hours ago',
                    },
                    {
                      user: 'Sarah J.',
                      action: 'created task',
                      item: 'Mobile responsiveness testing',
                      time: 'Yesterday',
                    },
                    {
                      user: 'Alex S.',
                      action: 'uploaded file',
                      item: 'final_logo_v2.png',
                      time: 'Yesterday',
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                      <div>
                        <p className="text-white">
                          <span className="font-medium">{activity.user}</span>{' '}
                          {activity.action}{' '}
                          <span className="text-purple-400">
                            {activity.item}
                          </span>
                        </p>
                        <p className="text-gray-400 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div
            className={`${
              viewMode === 'grid' ? 'grid grid-cols-3 gap-6' : 'space-y-6'
            }`}
          >
            {taskSections.map((section) => (
              <TaskSection
                key={section}
                title={section}
                sectionId={section.toLowerCase()}
                tasks={tasks[section.toLowerCase()] || []}
                toggleTaskStatus={toggleTaskStatus}
                moveTask={moveTask}
                allSections={taskSections.map((s) => s.toLowerCase())}
                viewMode={viewMode}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        );
      case 'files':
        return (
          <div className="text-gray-300">
            <h2 className="text-xl font-semibold mb-4">Project Files</h2>
            <input type="file" />
          </div>
        );
      case 'calendar':
        return (
          <div className="text-gray-300">
            <h2 className="text-xl font-semibold mb-4">Project Calendar</h2>
            <p>Calendar view will go here...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-gray-300">
            <h2 className="text-xl font-semibold mb-4">Project Settings</h2>
            <p>Settings configuration will go here...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-950 to-gray-900">
      {/* Header with breadcrumb and search */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="hover:text-purple-500 cursor-pointer transition-colors">
            Marketing
          </span>
          <span>/</span>
          <span className="hover:text-purple-500 cursor-pointer transition-colors">
            Website
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600 w-64"
            />
            <svg
              className="absolute left-3 top-2.5 text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Project content */}
      <div className="p-4">
        {/* Project title and view controls */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Launch</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <FiList size={18} />
            </button>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="ml-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FiPlus size={16} />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-6">
          <div className="flex space-x-6">
            {['Overview', 'Tasks', 'Files', 'Calendar', 'Settings'].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`pb-3 px-1 font-medium transition-colors ${
                    activeTab === tab.toLowerCase()
                      ? 'text-purple-500 border-b-2 border-purple-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* Tab content */}
        {renderTabContent()}
      </div>

      {/* Add Task Modal */}
      {renderAddTaskModal()}
    </div>
  );
}
