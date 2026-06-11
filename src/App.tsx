import { Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 text-purple-400" aria-hidden="true" />
          AgentCraft: AI Skill Hub
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-prose mx-auto">
          Your collaborative platform for crafting, organizing, and sharing AI agent skills.
        </p>
      </header>

      <main className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full text-center">
        <p className="text-gray-200 text-base mb-4">
          Project setup complete! Start building your AI agent skills here.
        </p>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          aria-label="Get started with AgentCraft"
        >
          Get Started
        </button>
      </main>

      <footer className="mt-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} AgentCraft. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
