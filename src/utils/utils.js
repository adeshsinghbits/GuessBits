import { v4 as uuidv4 } from "uuid";

const icons = ["😀", "🚀", "🎮", "🐱", "🌟", "🍕", "🎧", "🎁", "⚽", "📚"];

export function generateCardSet(level) {
  const count = level * 2 + 2;
  const iconSubset = icons.slice(0, count / 2);
  const paired = [...iconSubset, ...iconSubset];
  const shuffled = paired
    .map((icon) => ({ id: uuidv4(), icon, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
  return shuffled;
}