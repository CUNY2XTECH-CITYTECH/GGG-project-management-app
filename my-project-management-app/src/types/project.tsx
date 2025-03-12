export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'closed';
  teamMembers: string[];
  tasks: Task[];
}
