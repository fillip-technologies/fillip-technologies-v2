const ANNIVERSARY_START = new Date(2026, 6, 16, 0, 0, 0).getTime();
const ANNIVERSARY_END = new Date(2026, 6, 22, 23, 59, 59).getTime();

export function isAnniversaryActive(now: Date = new Date()) {
  const time = now.getTime();
  return time >= ANNIVERSARY_START && time <= ANNIVERSARY_END;
}
