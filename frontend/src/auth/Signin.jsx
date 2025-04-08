export default function Signin() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors px-4">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 transition-all">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
              Big Classes
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Sign in to access your premium content
            </p>
          </div>
  
          {/* Form */}
          <form className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
  
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
            >
              Sign In
            </button>
          </form>
  
          {/* Footer */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    );
  }
  