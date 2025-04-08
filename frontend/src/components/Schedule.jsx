import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"; // Use Card components
import { Clock, Calendar, Video } from "lucide-react"; // Icons for clarity

export default function Schedule() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      // Use current real-world date provided by context
      const now = new Date("2025-04-06T22:19:14+05:30"); // Set to current time provided: Sunday, April 6, 2025 at 10:19:14 PM IST
      setCurrentTime(now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }));
      setCurrentDate(now.toLocaleDateString([], {
        weekday: 'long', // e.g., Sunday
        month: 'long',   // e.g., April
        day: 'numeric',   // e.g., 6
      }));
    };

    updateDateTime(); // Initial call
    // Update every minute based on system time after initial set
    const interval = setInterval(() => {
        const now = new Date();
         setCurrentTime(now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
         }));
         // Date usually doesn't change within a session, but keep logic simple
         setCurrentDate(now.toLocaleDateString([], {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
         }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const events = [
    { title: "Python - OOPs", time: "9:00 - 9:30 AM", host: "Krishna", link: "#" },
    { title: "React Basics", time: "11:00 - 12:00 PM", host: "John", link: "#" },
    { title: "Data Structures Intro", time: "2:00 - 3:00 PM", host: "Alice", link: "#" },

  ];

  return (
    // Card uses its own theme background (bg-card dark:bg-card)
    <Card className="flex flex-col h-full overflow-hidden">
      {/* Header with blue background */}
      <CardHeader className="bg-blue-500 text-primary-foreground text-center py-4 px-4">
         <div className="flex items-center justify-center gap-2 mb-1">
             <Clock className="h-5 w-5" />
             <CardTitle className="text-xl font-bold">{currentTime}</CardTitle>
         </div>
        <p className="text-xs flex items-center justify-center gap-1">
            <Calendar className="h-3 w-3" /> {currentDate}
        </p>
      </CardHeader>

      {/* Event List */}
      <CardContent className="p-4 space-y-3 overflow-y-auto flex-1">
        {events.length > 0 ? (
            events.map((event, index) => (
            <div
                key={index}
                className="bg-card border border-transparent hover:border-border hover:bg-muted/50 p-3 rounded-md transition-colors duration-150"
            >
                <h3 className="text-sm font-semibold text-foreground">{event.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{event.time}</p>
                <p className="text-xs text-muted-foreground">Host: {event.host}</p>
                <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-500 dark:text-blue-400 text-xs mt-1.5 hover:underline font-medium"
                >
                <Video className="h-3.5 w-3.5 mr-1" />
                Join Class
                </a>
            </div>
            ))
        ) : (
             <p className="text-muted-foreground text-center pt-8">No scheduled events today.</p>
        )}
      </CardContent>
    </Card>
  );
}