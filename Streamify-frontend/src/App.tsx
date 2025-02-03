import "./App.css";
import DataVisuals from "./components/DataVisuals";
import Header from "./components/Header";
import KeyMetrics from "./components/KeyMetrics";
import RecentsTable from "./components/RecentsTable";
import { useScreenSize } from "./hooks";
import StreamifyProvider from "./context/providers/StreamifyProvider";

function App() {
  const { screen, windowSize } = useScreenSize();

  return (
    <StreamifyProvider value={{ screen, windowSize }}>
      <div className="bg-dark-bg-primary text-dark-text-primary min-h-screen">
        <Header />
        <KeyMetrics />
        <DataVisuals />
        <RecentsTable />
      </div>
    </StreamifyProvider>
  );
}

export default App;
