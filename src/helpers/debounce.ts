export default function debounce(f: any, ms: number): (args: any) => void {
  let lastCall = Date.now();
  let lastCallTimer: number;
  return function inner(...args) {
    const previousCall = lastCall;
    lastCall = Date.now();
    if (previousCall && lastCall - previousCall <= ms) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(() => f.apply(this, args), ms);
  };
}
