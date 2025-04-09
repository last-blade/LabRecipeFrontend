import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Menu, X, Moon, Sun, User } from "lucide-react";
import { useThemeStore } from "../../zustand/themeStore";
import axios from "axios";
import {Logout} from "../../zustand/authStore"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useThemeStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await Logout(); // this should call your axios.post + set isAuthenticated to false
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { path: "/dashboard", name: "Dashboard", icon: <Home size={20} /> },
    { path: "/recipes", name: "Recipes", icon: <ClipboardList size={20} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Theme Toggle */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              Lab Recipe
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Profile Section with Logout */}
          <div className="relative p-4 border-t dark:border-gray-700">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium dark:text-white">User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  user@example.com
                </p>
              </div>
            </div>

            {showProfileMenu && (
              <div className="absolute bottom-16 left-4 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md mt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
