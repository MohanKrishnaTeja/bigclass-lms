import { useState, useRef, useEffect } from "react";
import { Bell, Trash } from "lucide-react"; // Import Trash icon
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const notifications = [
  {
    id: 1,
    title: "New Comment",
    message: "Someone replied to your comment on Day 1 video.",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Course Update",
    message: "React Advanced course has a new lesson available.",
    time: "10 min ago",
    read: true,
  },
  {
    id: 3,
    title: "Weekly Report",
    message: "You watched 3 hours this week. Great job!",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    title: "System Alert",
    message: "Server maintenance scheduled for tomorrow.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    title: "Payment Received",
    message: "Your payment of $50 has been processed.",
    time: "1 day ago",
    read: true,
  },
  {
    id: 6,
    title: "New Follower",
    message: "John Doe started following you.",
    time: "2 days ago",
    read: true,
  },
];

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(notifications); // Use state for notifications
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const removeNotification = (id) => {
    setNotifs((prevNotifs) => prevNotifs.filter((notif) => notif.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="relative"
      >
        <Bell className="w-5 h-5 text-blue-600 dark:text-white" />
        {notifs.filter((notif) => !notif.read).length > 0 && (
          <>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </>
        )}
      </Button>

      {open && (
        <Card className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 shadow-xl border dark:border-gray-800 rounded-xl z-50">
          <div className="p-4 border-b dark:border-gray-800 font-semibold text-gray-800 dark:text-white">
            Notifications
          </div>
          <ScrollArea className="max-h-[400px]">
            <div className="divide-y dark:divide-gray-800">
              {notifs.length === 0 ? (
                <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                  No new notifications.
                </div>
              ) : (
                notifs.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
                      !notif.read ? "bg-blue-50 dark:bg-gray-800/50" : ""
                    } flex justify-between`} // Added flex justify-between
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {notif.title}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {notif.message}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeNotification(notif.id)}
                      className="text-red-500"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
}