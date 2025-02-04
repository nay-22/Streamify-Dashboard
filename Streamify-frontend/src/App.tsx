import { useScreenSize } from "./hooks";
import StreamifyProvider from "./context/providers/StreamifyProvider";
import { useEffect, useState } from "react";
import { ThemeMode } from "./types";
import ThemeProvider from "./context/providers/ThemeProvider";
import { lightTheme, darkTheme } from "./constants/ThemeConstants";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {
  const { screen, windowSize } = useScreenSize();

  const [themeMode, setThemeMode] = useState<ThemeMode>(
    JSON.parse(localStorage.getItem("mode") || "dark") as ThemeMode
  );

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(themeMode));
  }, [themeMode]);

  return (
    <StreamifyProvider value={{ screen, windowSize, themeMode, setThemeMode }}>
      <ThemeProvider
        value={themeMode === ThemeMode.LIGHT ? lightTheme : darkTheme}
      >
        <Dashboard />
      </ThemeProvider>
    </StreamifyProvider>
  );
}

export default App;
