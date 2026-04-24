import { Link, useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();
const token = localStorage.getItem("token");
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      
      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Manage Your Tasks Smarter 🚀
        </h1>

        <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl">
          A simple and secure task management system to organize your daily work,
          boost productivity, and stay focused.
        </p>

        <div className="flex gap-4">
<Link
  to={token ? "/task" : "/login"}
  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
>
  Get Started
</Link>

          <Link
            to="/signup"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition"
          >
            Create Account
          </Link>
        </div>
      </div>

      <div className="bg-white text-gray-800 py-16 px-6 rounded-t-3xl">
        <h2 className="text-2xl font-bold text-center mb-10">
          Why Choose Our Task Manager?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <div className="p-6 shadow-lg rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2">🔐 Secure</h3>
            <p className="text-gray-600">
              JWT-based authentication ensures your data is safe.
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2">⚡ Fast</h3>
            <p className="text-gray-600">
              Built with modern tech for lightning-fast performance.
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2">📱 Easy to Use</h3>
            <p className="text-gray-600">
              Clean UI designed for simplicity and productivity.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}