import { useEffect, useState } from "react";
import { ScreenSize, WindowSize } from "../types";
import { getScreenSize } from "../utils";

const DELAY = 200; // Debounce Delay

/**
 * A custom react hook for obtaining window width, height, and generic screen size info
 * based on current window width.
 * @returns An object containing ScreenSize and WindowSize
 */
const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [screen, setScreen] = useState<ScreenSize>(
    getScreenSize(window.innerWidth)
  );

  useEffect(() => {
    let timeoutId: number;

    const handleWindowResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      }, DELAY);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [DELAY]);

  useEffect(() => {
    const { width } = windowSize;
    setScreen(getScreenSize(width));
  }, [windowSize]);

  return { screen, windowSize };
};

export default useScreenSize;
