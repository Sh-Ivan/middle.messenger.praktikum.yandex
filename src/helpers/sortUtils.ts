const byTime = (a: { time: string }, b: { time: string }): number => {
  const aTime: Date = new Date(a.time);
  const bTime: Date = new Date(b.time);
  return aTime.getTime() - bTime.getTime();
};

export default byTime;
