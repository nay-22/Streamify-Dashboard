import { ScreenSize } from "../types";

/**
 * A utility function that formats the given number to the closest largest unit possible
 * by adding suffix that represents the largest unit.
 *
 * Supported Suffixes: Trillion(T), Billion(M), Million(M), Thousand(K).
 *
 * Prefer to use atleast 1 decimal point, otherwise gives same number for extremely large i/p/
 * @param num Number value
 * @returns Formatted string representing to the closes unit
 */
export const toClosestUnit = (
  num: number | string,
  maxDecimals: number = 0
): string => {
  if (typeof num === "string") {
    return num;
  }

  // Handle trillions (1e12)
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(maxDecimals) + " T";
  }

  // Handle billions (1e9)
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(maxDecimals) + " B";
  }

  // Handle millions (1e6)
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(maxDecimals) + " M";
  }

  // Handle thousands (1e3)
  if (num >= 1_000) {
    return (num / 1_000).toFixed(maxDecimals) + " K";
  }

  // If it's less than 1000, return the number itself
  return num.toFixed(2);
};

/**
 * A utility function that formats the given number to comma-seperated string of number conforming
 * the en-US locale.
 *
 * @param num Number value
 * @returns Comma-seperated number string
 */
export const toCommaSeperatedString = (num: number): string => {
  return num.toLocaleString("en-US");
};

/**
 * A utility function that capitalizes the the given string.
 * @param str String value
 * @returns Capitalized string value
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * A utility function that categorizes the given width to a generic screen size.
 * @param width Width(number) value
 * @returns ScreenSize enum
 */
export const getScreenSize = (width: number): ScreenSize => {
  if (width < 480) {
    return ScreenSize.SMALL;
  } else if (width >= 480 && width < 768) {
    return ScreenSize.MEDIUM;
  } else if (width >= 768 && width < 1024) {
    return ScreenSize.LARGE;
  } else if (width >= 1024 && width < 1860) {
    return ScreenSize.XLARGE;
  } else if (width >= 1860) {
    return ScreenSize.XXLARGE;
  } else {
    return ScreenSize.XXLARGE;
  }
};

export const generatePages = (length: number, limit: number): number[] => {
  return [...Array(Math.ceil(length / limit)).keys()].map((k) => k + 1);
};

export const generateVisiblePages = (
  totalPages: number,
  currPage: number
): (number | string)[] => {
  if (totalPages <= 7) return [...Array(totalPages)].map((_, i) => i + 1);

  if (currPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
  if (currPage >= totalPages - 3)
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];

  return [
    1,
    "...",
    currPage - 2,
    currPage - 1,
    currPage,
    currPage + 1,
    currPage + 2,
    "...",
    totalPages,
  ];
};
