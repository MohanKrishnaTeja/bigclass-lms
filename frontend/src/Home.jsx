import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import WatchTimeChart from "./components/WatchTimeChart";
import Schedule from "./components/Schedule";
import HomeCourses from "./components/HomeCourses";
import { Separator } from "./components/ui/separator";

export default function Home() {
  const [userName, setUserName] = useState("User");
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.username);

        // Fetch enrolled courses
        axios.get("http://127.0.0.1:8000/api/courses/my-courses/", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((response) => {
          setUserCourses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching courses", error);
        });

      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background dark:bg-gray-950">
      <div className="flex-1 p-6 lg:pr-3">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Welcome back, {userName}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Let's continue your learning journey.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Your Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userCourses.length > 0 ? (
              userCourses.map((enrollment) => (
                <HomeCourses
                  key={enrollment.id}
                  id={enrollment.course.id}
                  title={enrollment.course.title}
                  description={enrollment.course.description}
                />
              ))
            ) : (
              <p className="text-muted-foreground col-span-full">
                You are not enrolled in any courses yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-6 lg:hidden" />

      <aside className="w-full lg:w-[380px] p-6 lg:pl-3 lg:border-l border-border flex flex-col gap-6">
        <div className="h-[220px]">
          <WatchTimeChart />
        </div>
        <div className="flex-1 min-h-[300px]">
          <Schedule />
        </div>
      </aside>
    </div>
  );
}
