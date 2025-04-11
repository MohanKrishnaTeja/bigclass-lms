import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock, Calendar, Video } from "lucide-react";

export default function Schedule() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch today's schedule
    axios
      .get("http://127.0.0.1:8000/api/courses/schedule/today/")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
      });
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader className="bg-blue-500 text-primary-foreground text-center py-4 px-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Clock className="h-5 w-5" />
          <CardTitle className="text-xl font-bold">{currentTime}</CardTitle>
        </div>
        <p className="text-xs flex items-center justify-center gap-1">
          <Calendar className="h-3 w-3" /> {currentDate}
        </p>
      </CardHeader>

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
                href={event.zoom_link}
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
