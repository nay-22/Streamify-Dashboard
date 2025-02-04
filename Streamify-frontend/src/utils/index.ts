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

/**
 * A utility function that generates an array of page numbers using the given
 * data length and the limit per page.
 *
 * Used by Paginator to display all pages to allow users to skip to a particular page
 * @param length Total data length
 * @param limit Limit of items per page
 * @returns Array of total pages
 */
export const generatePages = (length: number, limit: number): number[] => {
  return [...Array(Math.ceil(length / limit)).keys()].map((k) => k + 1);
};

/**
 * A utilty function that generates an array of visible pages to be displayed by the Paginator
 * so that for extremely high number of pages, the pages don't overflow out of it.
 * @param totalPages Total number of pages
 * @param currPage Current page
 * @returns Array of visible pages
 */
export const generateVisiblePages = (
  totalPages: number,
  currPage: number
): (number | string)[] => {
  // If total pages <= 7, display all pages
  if (totalPages <= 7) return [...Array(totalPages)].map((_, i) => i + 1);

  // If, curr page <= 4, display upto page 5 including next page of curr page, followed by "...",
  // to indicate there are more pages after 5 till the last page.
  if (currPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];

  // If, curr page >= total pages - 3 => remaining 5 pages, display 1 and "..." followed by
  // 5 last pages to indicate there are pages between 1 and curr page - 1.
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

  // Else, display first page followed by "...", followed by 2 pages previous of curr page
  // and 2 pages next of curr page, followed by "..." and the last page. "..." indicates
  // there are pages between as well.
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
