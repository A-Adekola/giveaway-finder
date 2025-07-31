// src/data/giveaways.js
export const giveaways = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Giveaway Item #${i + 1}`,
  description: "A limited-time offer you won't want to miss!",
}));
