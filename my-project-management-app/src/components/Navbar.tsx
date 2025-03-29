"use client";
import Image from "next/image";
import logoImage from "../assets/images/logosaas.png";
import MenuIcon from "../assets/icons/menu.svg";
import { useState } from "react";

// If Navbar was fetching any data (like user info), replace with static data
const staticUserInfo = {
  name: "John Doe",
  avatar: "/images/avatar.png",
  // Add other fields as needed
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-black">
      <div className="px-4 ">
        <div className="py-4 flex items-center justify-between">
          <div className="relative">
            <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,rgba(252,214,255,0.7),rgba(41,216,255,0.7),rgba(255,253,128,0.7),rgba(248,154,191,0.7),rgba(252,214,255,0.7))] blur-md"></div>
            <Image
              src={logoImage}
              alt="Saas logo"
              className="h-12 w-12 relative"
            />
          </div>
          <div
            className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          >
            <MenuIcon className="text-white" />
          </div>
          <nav className="gap-6 items-center hidden sm:flex">
            <a
              href="/projects"
              className="text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              Projects
            </a>
            <a
              href="/teams"
              className="text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              Teams
            </a>
            <a
              href="/features"
              className="text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              Features
            </a>
            <a
              href="/help"
              className="text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              Help
            </a>
            <a
              href="/pricing"
              className="text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              Pricing
            </a>
            <a href="/signin">
              <button className="bg-white py-2 px-4 rounded-lg">
                Create Account
              </button>
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-3/4 bg-black border-l border-white border-opacity-20 z-50 transform transition-transform duration-300 ease-in-out shadow-lg">
          <div className="flex flex-col space-y-4 p-6 pt-16">
            <button
              className="absolute top-4 right-4 text-white opacity-60 hover:opacity-100"
              onClick={toggleMobileMenu}
            >
              ✕
            </button>
            <a
              href="/projects"
              className="text-opacity-60 text-white hover:text-opacity-100 transition py-2"
            >
              Projects
            </a>
            <a
              href="/teams"
              className="text-opacity-60 text-white hover:text-opacity-100 transition py-2"
            >
              Teams
            </a>
            <a
              href="/features"
              className="text-opacity-60 text-white hover:text-opacity-100 transition py-2"
            >
              Features
            </a>
            <a
              href="/help"
              className="text-opacity-60 text-white hover:text-opacity-100 transition py-2"
            >
              Help
            </a>
            <a
              href="/pricing"
              className="text-opacity-60 text-white hover:text-opacity-100 transition py-2"
            >
              Pricing
            </a>
            <a href="/signin" className="py-2">
              <button className="bg-white py-2 px-4 rounded-lg w-full">
                Create Account
              </button>
            </a>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
};
