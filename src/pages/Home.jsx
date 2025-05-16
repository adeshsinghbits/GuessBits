import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-bold mb-6">Memory Game</h1>
      <Link to="/game">
        <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Play Now
        </button>
      </Link>
    </motion.div>
  );
}
