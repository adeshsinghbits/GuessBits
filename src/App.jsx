// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemoryGame from "./pages/MemoryGame";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<MemoryGame />} />
        <Route path="/about" element={<div className="text-white p-6">This is a futuristic memory game powered by React and Redux.</div>} />
      </Routes>
    </Router>
  );
}

export default App;
