import './App.css'

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
        TailwindCSS + React + TypeScript 🎨
      </h1>
      <p className="text-lg font-medium opacity-90">
        If you can see the gradient background and styled text, Tailwind works!
      </p>
      <button className="mt-6 rounded-xl bg-white/20 px-6 py-2 text-black hover:bg-white/30 transition-all">
        Test Button
      </button>
    </div>
  );
}

export default App;
