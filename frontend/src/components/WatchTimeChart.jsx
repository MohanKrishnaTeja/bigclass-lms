import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"; // Use Card components

// Keep example data
const data = [
  { day: "Sun", hours: 3 }, { day: "Mon", hours: 2 }, { day: "Tue", hours: 3.5 },
  { day: "Wed", hours: 5 }, { day: "Thu", hours: 4 }, { day: "Fri", hours: 1.2 },
  { day: "Sat", hours: 0.8 },
];

// Calculate total watch time from data (or get dynamically)
const totalHours = data.reduce((sum, item) => sum + item.hours, 0);
const formattedTotalTime = `${Math.floor(totalHours)} hrs, ${Math.round((totalHours % 1) * 60)} mins`;


export default function WatchTimeChart() {
  const { theme } = useTheme();
  // Define theme-based colors
  const primaryColor = theme === 'dark' ? '#60a5fa' : '#2563eb'; // blue-400 / blue-600
  const mutedForeground = theme === 'dark' ? 'hsl(var(--muted-foreground))' : 'hsl(var(--muted-foreground))';
  const cardBg = theme === 'dark' ? 'hsl(var(--card))' : 'hsl(var(--card))';
  const tooltipCursor = theme === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.1)';
  const themeBorder = 'hsl(var(--border))';
  const themeForeground = 'hsl(var(--foreground))';
  const themeRadius = 'var(--radius)';
  // const themeShadow = 'var(--shadow-md)'; // Define if needed

  return (
    // Card uses its own theme background (bg-card dark:bg-card)
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-lg text-primary">
            Weekly Watch Time
        </CardTitle>
        <CardDescription>Total this week: {formattedTotalTime}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pt-2 pb-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: mutedForeground }}
              dy={5}
            />
            <YAxis hide domain={[0, 'dataMax + 1']} />
            <Tooltip
              contentStyle={{
                backgroundColor: cardBg,
                borderColor: themeBorder,
                color: themeForeground,
                borderRadius: themeRadius,
                padding: '4px 8px',
                fontSize: '12px',
                // boxShadow: themeShadow, // Add if you have shadow vars
              }}
              labelStyle={{ marginBottom: '4px', fontWeight: '500' }}
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