/**
 * A utility function that formats the given number to the closest largest unit possible
 * by adding suffix that represents the largest unit.
 * 
 * Supported Suffixes: Trillion(T), Billion(M), Million(M), Thousand(K)
 * @param num Number value
 * @returns Return formatted string representing to the closes unit
 */
export const toClosestUnit = (num: number | string): string => {
  if (typeof num === "string") {
    return num;
  }

  // Handle trillions (1e12)
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(2) + " T";
  }

  // Handle billions (1e9)
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + " B";
  }

  // Handle millions (1e6)
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + " M";
  }

  // Handle thousands (1e3)
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + " K";
  }

  // If it's less than 1000, return the number itself
  return num.toFixed(2);
};
