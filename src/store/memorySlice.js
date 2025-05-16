import { createSlice } from "@reduxjs/toolkit";
import { generateCardSet } from "../utils/utils";

const initialState = {
  level: 1,
  cards: [],
  flipped: [],
  matchedCount: 0,
  score: 0,
  isGameWon: false,
  timeLeft: 60,
  timerRunning: false,
};

const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {
    startLevel(state) {
      const cards = generateCardSet(state.level);
      state.cards = cards;
      state.flipped = [];
      state.matchedCount = 0;
      state.isGameWon = false;
      state.timeLeft = 60;
      state.timerRunning = true;
    },
    flipCard(state, action) {
      const id = action.payload;
      const card = state.cards.find((c) => c.id === id);
      if (card.flipped || card.matched || state.flipped.length === 2) return;

      card.flipped = true;
      state.flipped.push(card);

      if (state.flipped.length === 2) {
        const [a, b] = state.flipped;
        if (a.icon === b.icon) {
          a.matched = b.matched = true;
          state.matchedCount += 2;
          state.score += 10;
          state.flipped = [];

          if (state.matchedCount === state.cards.length) {
            state.isGameWon = true;
            state.timerRunning = false;
          }
        }
      }
    },
    unflipCards(state) {
      const [a, b] = state.flipped;
      state.cards = state.cards.map((card) => {
        if (card.id === a.id || card.id === b.id) {
          return { ...card, flipped: false };
        }
        return card;
      });
      state.flipped = [];
      state.score -= 2;
    },
    tick(state) {
      if (state.timerRunning && state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else {
        state.timerRunning = false;
      }
    },
    nextLevel(state) {
      state.level += 1;
    },
    resetGame() {
      return initialState;
    },
  },
});

export const {
  startLevel,
  flipCard,
  unflipCards,
  nextLevel,
  resetGame,
  tick,
} = memorySlice.actions;
export default memorySlice.reducer;
