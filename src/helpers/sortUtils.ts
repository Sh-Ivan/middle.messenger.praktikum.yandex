export const byTime = (a, b): number => {
  const aTime: Date = new Date(a.time);
  const bTime: Date = new Date(b.time);
  return aTime - bTime;
};
