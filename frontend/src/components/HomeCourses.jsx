import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"; // Use Card components
import { ArrowRight } from "lucide-react"; // Optional: Add an icon

export default function HomeCourses({ id = 1, title = "Course Title", description = "Course description goes here." }) {
  return (
    // Card component uses its own theme background (bg-card dark:bg-card)
    <Card className="flex flex-col h-full"> {/* Make card take full height of grid cell */}
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm line-clamp-3"> {/* Limit description lines */}
            {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-4"> {/* Push footer to bottom */}
        <Button
          asChild
          // Keep your specified blue colors
          className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Link to={`/course/${id}`}>
            Continue Learning
            <ArrowRight className="ml-2 h-4 w-4" /> {/* Optional icon */}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}