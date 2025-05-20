import { useDispatch, useSelector } from "react-redux";
import {
  startLevel,
  flipCard,
  unflipCards,
  nextLevel,
  resetGame,
  tick,
} from "../store/memorySlice";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRedoAlt } from "react-icons/fa";

export default function MemoryGame() {
  const dispatch = useDispatch();
  const {
    cards,
    flipped,
    isGameWon,
    gameOver,
    level,
    score,
    timeLeft,
    timerRunning,
  } = useSelector((state) => state.memory);

  const [showWinMessage, setShowWinMessage] = useState(false);

  useEffect(() => {
    dispatch(startLevel());
  }, [dispatch, level]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      if (a.icon !== b.icon) {
        setTimeout(() => dispatch(unflipCards()), 1000);
      }
    }
  }, [flipped, dispatch]);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => dispatch(tick()), 1000);
    return () => clearInterval(interval);
  }, [timerRunning, dispatch]);

  useEffect(() => {
    if (isGameWon) {
      setShowWinMessage(true);
    }
  }, [isGameWon]);

  function handleNextLevel() {
    setShowWinMessage(false);
    setTimeout(() => {
      dispatch(nextLevel());
    }, 600);
  }

  const confettiVariants = {
    initial: { opacity: 0, y: -20, scale: 0.5 },
    animate: {
      opacity: 1,
      y: [0, -30, 0],
      scale: [1, 1.5, 1],
      rotate: [0, 360],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="flex flex-col  mt-16 items-center p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-extrabold mb-4 tracking-widest text-neon-blue drop-shadow-neon">
        🧠 GuessBits
      </h1>

      <div className="mb-4 text-lg flex gap-6 font-mono">
        <div>Level: {level}</div>
        <div>Score: {score}</div>
        <div>Time Left: {timeLeft}s</div>
      </div>

      {gameOver ? (
        <div className="text-center mt-6 text-red-500 text-3xl font-bold">
          ⏰ Time's Up! Game Over!
        </div>
      ) : (
        <div
          className={`grid gap-5 mb-8 ${
            cards.length <= 8 ? "grid-cols-2" : "grid-cols-4"
          }`}
        >
          {cards.map((card) => {
            const isFlipped = card.flipped || card.matched;
            return (
              <motion.div
                key={card.id}
                className="w-24 h-24 perspective"
                onClick={() => dispatch(flipCard(card.id))}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`relative w-full h-full rounded-lg shadow-lg cursor-pointer
                    ${
                      isFlipped
                        ? "shadow-neon-glow"
                        : "shadow-md shadow-blue-100"
                    }
                  `}
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                    scale:
                      flipped.length === 2 && !card.matched
                        ? [1, 1.05, 1]
                        : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="absolute w-full h-full bg-gradient-to-tr from-blue-900 to-blue-700 flex items-center justify-center rounded-lg text-5xl select-none"
                    style={{
                      backfaceVisibility: "hidden",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      boxShadow: "inset 0 0 15px #00ffff",
                    }}
                  >
                    ❓
                  </motion.div>

                  <motion.div
                    className="absolute w-full h-full bg-gradient-to-tr from-black to-gray-900 flex items-center justify-center rounded-lg text-5xl select-none text-neon-blue"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      textShadow: "0 0 8px #fff",
                    }}
                  >
                    {card.icon}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {isGameWon && showWinMessage && (
          <motion.div
            key="win-message"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="flex flex-col items-center gap-3"
          >
            <motion.div
              className="text-5xl font-extrabold text-neon-green drop-shadow-neon"
              animate={{
                color: ["#000"],
                textShadow: [
                  "0 0 10px #fff, 0 0 20px #00FFAB",
                ],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              🎉 Level Complete! 🎉
            </motion.div>

            <div className="flex gap-2">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full bg-neon-green"
                  variants={confettiVariants}
                  initial="initial"
                  animate="animate"
                  style={{ originX: 0.5, originY: 0.5 }}
                />
              ))}
            </div>

            <button
              onClick={handleNextLevel}
              className="px-6 py-3 bg-slate-500 rounded shadow-lg hover:bg-neon-green-light text-black font-bold uppercase tracking-widest transition"
            >
              Next Level
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {(isGameWon || gameOver) && (
        <button
          onClick={() => {
            dispatch(resetGame());
            dispatch(startLevel());
          }}
          className="mt-4 flex items-center gap-2 px-5 py-2 bg-red-700 rounded shadow hover:bg-red-800 transition"
        >
          <FaRedoAlt /> Restart
        </button>
      )}
    </motion.div>
  );
}
