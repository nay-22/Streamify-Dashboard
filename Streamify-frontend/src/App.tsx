import "./App.css";
import DataVisuals from "./components/DataVisuals";
import Header from "./components/Header";
import KeyMetrics from "./components/KeyMetrics";
import RecentsTable from "./components/RecentsTable";

function App() {
  return (
    <>
      <div className="bg-dark-bg-primary text-dark-text-primary min-h-screen">
        <Header />
        <KeyMetrics />
        <DataVisuals />
        <RecentsTable />
      </div>
    </>
  );
}

export default App;
