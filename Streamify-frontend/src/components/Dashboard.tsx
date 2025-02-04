import { useTheme } from "../hooks";
import DataVisuals from "./DataVisuals";
import Header from "./Header";
import KeyMetrics from "./KeyMetrics";
import RecentsTable from "./RecentsTable";

const Dashboard = () => {
    const theme = useTheme();
    return <>
        <div className={`${theme.background?.primary} ${theme.text?.primary} min-h-screen`}>
            <Header />
            <KeyMetrics />
            <DataVisuals />
            <RecentsTable />
        </div>
    </>
}

export default Dashboard;