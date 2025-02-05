import { useScreenSize } from "./hooks";
import StreamifyProvider from "./context/providers/StreamifyProvider";
import { ThemeMode } from "./types";
import ThemeProvider from "./context/providers/ThemeProvider";
import { lightTheme, darkTheme } from "./constants/ThemeConstants";
import Dashboard from "./components/Dashboard";

import "./App.css";
import usePersistedState from "./hooks/usePersistedState";

function App() {
  const { screen, windowSize } = useScreenSize();

  const [themeMode, setThemeMode] = usePersistedState<ThemeMode>({
    key: "mode",
    initialState: ThemeMode.DARK,
  });

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
