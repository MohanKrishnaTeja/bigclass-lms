
import { ThemeProvider } from "./components/theme-provider"; // adjust the path if needed
import LandingPage from "./LandingPage";
import Navbar from './shared/Navbar';
import Signin from './auth/Signin';
import Home from './Home';
import { Routes, Route } from "react-router-dom";
import CoursePage from "./components/CoursePage";
import Questions from "./components/Questions";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/course/:id/:videoId" element={<CoursePage/>} />
        <Route path="/questions" element={<Questions/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
