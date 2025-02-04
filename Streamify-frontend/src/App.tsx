import { useScreenSize } from "./hooks";
import StreamifyProvider from "./context/providers/StreamifyProvider";
import { useState } from "react";
import { ThemeMode } from "./types";
import ThemeProvider from "./context/providers/ThemeProvider";
import { lightTheme, darkTheme } from "./constants/ThemeConstants";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {
  const { screen, windowSize } = useScreenSize();

  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.DARK);


  return (
    <StreamifyProvider value={{ screen, windowSize, themeMode, setThemeMode }}>
      <ThemeProvider value={themeMode === ThemeMode.LIGHT ? lightTheme : darkTheme}>
        <Dashboard />
      </ThemeProvider>
    </StreamifyProvider>
  );
}

export default App;
