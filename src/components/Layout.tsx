import React from "react";
import { useTheme } from "../context/ThemeContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 dark:text-white`}>
      <header className="flex justify-between items-center px-12 p-3 bg-gray-200 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-200">
          Options Strategy Risk & Reward Analysis
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          {theme === "dark" ? "🌞" : "🌜"}
        </button>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
