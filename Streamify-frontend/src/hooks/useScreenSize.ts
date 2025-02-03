import { useEffect, useState } from "react";
import { ScreenSize } from "../types";
import { getScreenSize } from "../utils";

type WindowSize = {
  width: number;
  height: number;
};

const DELAY = 200;

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
