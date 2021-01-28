/**
 * Get unix timestamp
 * @param date The date
 */
export function getUnixTime(date: Date): number {
  return (date.getTime() / 1e3) | 0;
}
