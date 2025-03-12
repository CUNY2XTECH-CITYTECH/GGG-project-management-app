'use client';

import { useState } from 'react';
import { Project, Task } from '@/types/project';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/Table';
import Dialog from '@/components/ui/Dialog';

// ✅ Define an Enum for Status
enum ProjectStatus {
  Active = 'active',
  Closed = 'closed',
}

const sampleProject: Project = {
  id: '1',
  name: 'Project Alpha',
  description: 'This is a sample project for managing tasks.',
  status: ProjectStatus.Active,
  teamMembers: ['Alice', 'Bob', 'Charlie'],
  tasks: [
    { id: '101', title: 'Design UI', status: 'todo' },
    { id: '102', title: 'Set up database', status: 'in-progress' },
    { id: '103', title: 'Write API', status: 'done' },
  ],
};

const ProjectPage = () => {
  const [project, setProject] = useState(sampleProject);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    status: 'todo' as Task['status'],
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const updatedProject = {
      ...project,
      tasks: [...project.tasks, { id: Date.now().toString(), ...newTask }],
    };

    setProject(updatedProject);
    setIsTaskModalOpen(false);
    setNewTask({ title: '', status: 'todo' });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Project Information */}
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <p className="text-gray-600">{project.description}</p>

      {/* Team Members */}
      <h2 className="text-xl font-bold mt-4">Team Members</h2>
      <ul className="list-disc pl-6">
        {project.teamMembers.map((member) => (
          <li key={member} className="text-gray-700">
            {member}
          </li>
        ))}
      </ul>

      {/* Tasks Section */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-bold">Tasks</h2>
        <Button onClick={() => setIsTaskModalOpen(true)}>Add Task</Button>
      </div>

      {/* Tasks Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {project.tasks.length > 0 ? (
            project.tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-gray-400">
                No tasks available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Task Creation Modal */}
      <Dialog
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      >
        <h2 className="text-xl font-bold">Add Task</h2>
        <Input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <select
          className="border rounded p-2 mt-2"
          value={newTask.status}
          onChange={(e) =>
            setNewTask({ ...newTask, status: e.target.value as Task['status'] })
          }
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <Button onClick={handleAddTask}>Create Task</Button>
      </Dialog>
    </div>
  );
};

export default ProjectPage;
