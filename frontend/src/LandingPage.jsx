export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-5xl font-extrabold mb-6 text-blue-600">Welcome to BigClasses</h1>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
                Your one-stop platform for online learning. Explore courses, track progress, and achieve your goals with ease.
            </p>
            <div className="flex space-x-4">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                    Get Started
                </button>
                <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300">
                    Learn More
                </button>
            </div>
        </div>
    );
}