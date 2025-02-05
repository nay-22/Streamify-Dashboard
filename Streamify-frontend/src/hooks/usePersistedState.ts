import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type LocalStorageOptions<T> = {
  key: string;
  initialState: T;
};

export type LocalStorageManager<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  () => void
];

/**
 * A custom hook with similar functionality to useState but also syncs the state variable to the localStorage
 * @param options Local storage options object
 * @returns A stateful value, a function to update it, a function to discard it.
 */
const usePersistedState = <T>(
  options: LocalStorageOptions<T>
): LocalStorageManager<T> => {
  const { key, initialState } = options;

  const getPersistedState = (): T => {
    try {
      return JSON.parse(localStorage.getItem(key) || "") as T;
    } catch (e: any) {
      console.error("Local state not found, switching to initial state");
      return initialState;
    }
  };

  const persistState = (item: T) => {
    localStorage.setItem(key, JSON.stringify(item));
  };

  const discardState = () => {
    localStorage.removeItem(key);
  };

  const [item, setItem] = useState<T>(getPersistedState);

  // Sync state with localStorage
  useEffect(() => {
    if (item) {
      persistState(item);
    }
  }, [item, key]);

  // Sync across tabs => listen to storage event
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        // If the item changes in another tab, update the state
        setItem(getPersistedState());
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [item, setItem, discardState];
};

export default usePersistedState;
