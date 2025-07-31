export const mockGiveaways = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Giveaway Item ${i + 1}`,
  image: `https://picsum.photos/300/200?random=${i + 1}`,
}));
