/**
 * Get unix timestamp
 * @param date The date
 */
export function getUnixTime(date: Date): number {
  return (date.getTime() / 1e3) | 0
}

/**
 * Get the current unit time
 */
export function getCurrentUnixTime(): number {
  return getUnixTime(new Date())
}

/**
 * Generates the trade unix time
 */
export function generateDeadlineUnixTime(deadlineMinutes: number): number {
  return Math.floor(Date.now() / 1000) + deadlineMinutes * 60
}
