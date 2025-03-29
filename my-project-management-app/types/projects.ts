import { ReactNode } from "react";

export type ProjectCategory = {
  id: string;
  name: string;
  icon: ReactNode;
  subCategories?: {
    id: string;
    name: string;
    icon: ReactNode;
  }[];
};

export type Task = {
  id: string;
  title: string;
  status: "done" | "in progress" | "pending";
  dueDate: string;
  assignee: string;
  assigneeAvatar: string;
}; 