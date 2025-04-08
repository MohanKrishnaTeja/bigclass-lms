import { Link } from "react-router-dom";
import { Bell, LogOut, User } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle";
import { Button } from "../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import Notifications from "@/components/Notifications";

// Simulated auth status (replace with real logic)
const isLoggedIn = true;
const user = {
  name: "Krishna",
  avatar: "https://pbs.twimg.com/media/D7MVET_U0AAMXS_?format=jpg&name=900x900",
};

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-950 text-blue-600 dark:text-white py-3 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center w-full px-4">
        {/* Left: Logo & Nav Links */}
        <div className="flex items-center space-x-6">
          <div className="text-xl font-semibold tracking-tight">
            <Link to="/home" className="hover:opacity-80 transition">
              Big Classes
            </Link>
          </div>

          <div className="hidden md:flex space-x-4 text-sm font-medium">
            <Link
              to="/questions"
              className="hover:text-blue-700 dark:hover:text-gray-300 transition"
            >
              Questions
            </Link>
            <Link
              to="/bookmarks"
              className="hover:text-blue-700 dark:hover:text-gray-300 transition"
            >
              Bookmarks
            </Link>
            <Link
              to="/courses"
              className="hover:text-blue-700 dark:hover:text-gray-300 transition"
            >
              Courses
            </Link>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-3">
          {/* Notification */}
          <Notifications/>

          {/* Theme Toggle */}
          <ModeToggle />

          {/* Auth */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage src="https://www.shadcn-vue.com/avatars/02.png" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Logged out")}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/signin">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 dark:border-white dark:text-white hover:bg-blue-50 dark:hover:bg-gray-800 text-sm px-3 py-1"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-1">
                  Join Now
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
