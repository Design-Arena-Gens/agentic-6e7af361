import { useEffect, useState } from "react";

export function useLocalState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const value = window.localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // LocalStorage might be unavailable (private mode). Ignore gracefully.
    }
  }, [key, state]);

  return [state, setState] as const;
}
