/**
 * Deep clone object
 * @param object The object to clone
 */
export function deepClone<T>(object: T): T {
  return JSON.parse(JSON.stringify(object)) as T;
}
