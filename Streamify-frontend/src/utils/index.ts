import { ScreenSize } from "../types";

/**
 * A utility function that formats the given number to the closest largest unit possible
 * by adding suffix that represents the largest unit.
 *
 * Supported Suffixes: Trillion(T), Billion(M), Million(M), Thousand(K)
 * @param num Number value
 * @returns Return formatted string representing to the closes unit
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

export const toCommaSeperatedString = (num: number): string => {
  return num.toLocaleString("en-US");
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

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
    return ScreenSize.XXLARGE
  }
};

export const getChartContainerDimensions = (
  size: ScreenSize
): { width: number; height: number } => {
  switch (size) {
    case ScreenSize.SMALL:
      return { width: 320, height: 250 };
    case ScreenSize.MEDIUM:
      return { width: 300, height: 250 };
    case ScreenSize.LARGE:
      return { width: 400, height: 250 };
    case ScreenSize.XLARGE:
      return { width: 450, height: 250 };
    case ScreenSize.XXLARGE:
      return { width: 550, height: 250 };
    default:
      return { width: 500, height: 250 };
  }
};
