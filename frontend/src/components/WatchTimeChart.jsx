import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/components/theme-provider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";

// Example fallback data (optional)
const fallbackData = [
  { day: "Sun", hours: 3 },
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 3.5 },
  { day: "Wed", hours: 5 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 1.2 },
  { day: "Sat", hours: 0.8 },
];

export default function WatchTimeChart() {
  const { theme = "light" } = useTheme(); // fallback to light
  const [loading, setLoading] = useState(true);
  const [watchData, setWatchData] = useState([]);
  const [error, setError] = useState(null);

  const fetchWatchData = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token?.substring(0, 15) + "...");

    if (!token) {
      console.warn("No auth token found.");
      setWatchData(fallbackData); // fallback
      setLoading(false);
      return;
    }

    try {
      // Use axios with explicit configuration
      const res = await axios({
        method: 'get',
        url: "http://127.0.0.1:8000/api/watchtime/",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: false, // Try without credentials
      });

      console.log("Response data:", res.data);
      if (Array.isArray(res.data)) {
        setWatchData(res.data);
        setError(null);
      } else {
        console.warn("Unexpected watch data format:", res.data);
        setWatchData(fallbackData); // fallback
      }
    } catch (error) {
      console.error("Failed to fetch watch time", error);
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        setError(`Error ${error.response.status}: ${error.response.data?.error || 'Unable to fetch data'}`);
      } else if (error.request) {
        console.log("No response received:", error.request);
        setError("Network error: No response received from server");
      } else {
        console.log("Error message:", error.message);
        setError("Error: " + error.message);
      }
      setWatchData(fallbackData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchData();
    const interval = setInterval(fetchWatchData, 10 * 60 * 1000); // every 10 mins
    return () => clearInterval(interval);
  }, []);

  // Defensive check
  const validData = Array.isArray(watchData) ? watchData : [];
  const totalHours = validData.reduce((sum, item) => sum + (item.hours || 0), 0);
  const formattedTotalTime = `${Math.floor(totalHours)} hrs, ${Math.round((totalHours % 1) * 60)} mins`;

  // Colors & theming
  const primaryColor = theme === "dark" ? "#60a5fa" : "#2563eb";
  const mutedForeground = theme === "dark" ? "#94a3b8" : "#475569";
  const cardBg = theme === "dark" ? "#1e293b" : "#ffffff";
  const tooltipCursor = theme === "dark" ? "rgba(96, 165, 250, 0.1)" : "rgba(37, 99, 235, 0.1)";
  const themeBorder = "#e2e8f0";
  const themeForeground = theme === "dark" ? "#f8fafc" : "#1e293b";
  const themeRadius = "0.5rem";

  if (loading) {
    return <Card className="flex h-full items-center justify-center">Loading...</Card>;
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Weekly Watch Time</CardTitle>
        <CardDescription>
          {error ? (
            <span className="text-amber-600 dark:text-amber-400 text-xs">
              {error} (showing sample data)
            </span>
          ) : (
            `Total this week: ${formattedTotalTime}`
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pt-2 pb-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={validData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: mutedForeground }}
              dy={5}
            />
            <YAxis hide domain={[0, "dataMax + 1"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: cardBg,
                borderColor: themeBorder,
                color: themeForeground,
                borderRadius: themeRadius,
                padding: "4px 8px",
                fontSize: "12px",
              }}
              labelStyle={{ marginBottom: "4px", fontWeight: "500" }}
              formatter={(value) => [`${value} hours`, null]}
              cursor={{ fill: tooltipCursor }}
            />
            <Bar
              dataKey="hours"
              fill={primaryColor}
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
