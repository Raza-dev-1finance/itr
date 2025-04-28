export function setStorage<T>(key: string, value: T): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export function getStorage<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }
  return null;
}

export function removeStorage(key: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(key);
  }
}
