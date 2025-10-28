import { useTheme } from "@/components/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="ml-2 rounded-md border border-gray-300 px-3 py-1 text-sm 
                 transition-all duration-200 dark:border-gray-600
                 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
