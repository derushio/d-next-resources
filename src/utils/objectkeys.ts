export function objectkeys<T extends { [key: string]: unknown }>(
  obj: T,
): (keyof T)[] {
  return Object.keys(obj);
}
