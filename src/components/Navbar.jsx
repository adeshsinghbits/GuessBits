// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { FaGamepad, FaHome, FaInfoCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0  bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold text-white tracking-wide">🧠 GuessBits</h1>
      <div className="flex gap-6 text-white text-lg pr-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-1 hover:text-neon-green transition ${isActive ? "text-neon-green bg-slate-500 px-2 py-1 rounded-md" : ""}`
          }
        >
          <FaHome /> Home
        </NavLink>
        <NavLink
          to="/game"
          className={({ isActive }) =>
            `flex items-center gap-1 hover:text-neon-green transition ${isActive ? "text-neon-green bg-slate-500 px-2 py-1 rounded-md" : ""}`
          }
        >
          <FaGamepad /> Play
        </NavLink>
      </div>
    </nav>
  );
}
