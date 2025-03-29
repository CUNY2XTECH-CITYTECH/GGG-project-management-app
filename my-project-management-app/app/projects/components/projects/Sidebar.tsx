"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiGrid,
  FiCalendar,
  FiBell,
  FiUsers,
  FiSettings,
  FiPieChart,
  FiHome,
} from "react-icons/fi";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("projects");

  const menuItems = [
    { id: "home", icon: <FiHome size={22} />, label: "Home", href: "/" },
    {
      id: "projects",
      icon: <FiGrid size={22} />,
      label: "Projects",
      href: "/projects",
    },
    {
      id: "calendar",
      icon: <FiCalendar size={22} />,
      label: "Calendar",
      href: "/calendar",
    },
    {
      id: "notifications",
      icon: <FiBell size={22} />,
      label: "Notifications",
      href: "/notifications",
      hasNotification: true,
    },
    { id: "team", icon: <FiUsers size={22} />, label: "Team", href: "/team" },
    {
      id: "analytics",
      icon: <FiPieChart size={22} />,
      label: "Analytics",
      href: "/analytics",
    },
    {
      id: "settings",
      icon: <FiSettings size={22} />,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div className="w-[90px] bg-gray-950 border-r border-gray-800 flex flex-col items-center py-6 space-y-8 justify-between min-h-screen ">
      <div className="flex flex-col items-center space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setActiveItem(item.id)}
            className={`p-3 rounded-xl relative group flex flex-col items-center transition-all duration-200 ${
              activeItem === item.id
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-1">{item.label}</span>
            {item.hasNotification && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
            )}
          </Link>
        ))}
      </div>
      <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mb-6">
        <span className="text-xl font-bold">P</span>
      </div>
    </div>
  );
}
