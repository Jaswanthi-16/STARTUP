import { useState, useEffect, useCallback, useRef } from 'react';

// In-memory fallback storage for when localStorage is not available (e.g. Safari private mode, cookies disabled)
const memoryStorage = new Map();

/**
 * A robust hook to manage state synchronized with localStorage.
 * Features:
 * - Lazy initialization (supports functions for initialValue)
 * - Safe JSON parsing & writing (gracefully handles syntax/parse errors)
 * - Cross-tab synchronization via standard window 'storage' event
 * - Automatic in-memory fallback when localStorage is blocked/unavailable
 * 
 * @template T
 * @param {string} key - The key to store the value under in localStorage.
 * @param {T | (() => T)} initialValue - The initial value or initializer function.
 * @returns {[T, (value: T | ((val: T) => T)) => void]} A stateful value and a function to update it.
 */
export function useLocalStorage(key, initialValue) {
  // Resolve initial value in case it is a function initializer
  const getInitialValue = useCallback(() => {
    const value = initialValue instanceof Function ? initialValue() : initialValue;
    
    if (typeof window === 'undefined') {
      return value;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      // Try to read from in-memory fallback if localStorage failed
      if (memoryStorage.has(key)) {
        return memoryStorage.get(key);
      }
    }
    
    return value;
  }, [key, initialValue]);

  // Main state initialized lazily
  const [storedValue, setStoredValue] = useState(getInitialValue);

  // Keep a ref of the current value to prevent effect dependencies recreation on every change
  const storedValueRef = useRef(storedValue);
  useEffect(() => {
    storedValueRef.current = storedValue;
  }, [storedValue]);

  // Setter function wrapping state update and persistence
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we match useState API
      const valueToStore = value instanceof Function ? value(storedValueRef.current) : value;

      // Update React state
      setStoredValue(valueToStore);

      // Save to localStorage or fallback to memory
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (innerError) {
          // LocalStorage is blocked, full or not available (private browsing)
          console.warn(`localStorage setItem failed for key "${key}":`, innerError);
          memoryStorage.set(key, valueToStore);
        }
      }
    } catch (error) {
      console.error(`Failed to execute setValue for key "${key}":`, error);
    }
  }, [key]);

  // Synchronize state across different browser tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : null;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing synced storage key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

