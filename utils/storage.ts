/**
 * Save data to localStorage
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (e) {
    console.warn(`Error saving ${key}`, e);
  }
};

/**
 * Get data from localStorage
 */
export const getStorageItem = <T>(key: string): T | null => {
  try {
    const jsonValue = localStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.warn(`Error reading ${key}`, e);
    return null;
  }
};

/**
 * Remove a specific Storageitem from localStorage
 */
export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`Error removing ${key}`, e);
  }
};

/**
 * Clear all app data (⚠️ use carefully)
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (e) {
    console.warn("Error clearing storage", e);
  }
};
