import { getUnixTime } from './get-unix-time';

/**
 * Get the current unit time
 */
export function getCurrentUnixTime(): number {
  return getUnixTime(new Date());
}
