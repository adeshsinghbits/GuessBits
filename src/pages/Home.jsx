// src/components/Home.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="min-h-screen mt-16 bg-gradient-to-br from-black to-gray-900 text-white p-10 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-5xl font-bold text-neon-green mb-6 tracking-wider">
        Welcome to GuessBits
      </h1>

      <div className="max-w-3xl text-lg text-center leading-8">
        <p className="mb-4">
          Test your memory and speed in this high-tech, neon-powered matching game. Each level increases in complexity — can you keep up with the challenge?
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-neon-blue">🕹️ How to Play</h2>
        <ul className="text-left list-disc list-inside mb-4">
          <li>Click a card to flip it and reveal the icon.</li>
          <li>Flip another card — if they match, they stay visible!</li>
          <li>If they don’t match, they’ll flip back automatically.</li>
          <li>Match all pairs before the timer runs out to win the level.</li>
          <li>Complete levels to unlock harder ones!</li>
        </ul>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6"
        >
          <Link
            to="/game"
            className="bg-neon-green  text-white px-6 py-3 font-bold rounded-lg shadow-lg uppercase tracking-widest hover:bg-green-400 transition"
          >
            Start Playing
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
