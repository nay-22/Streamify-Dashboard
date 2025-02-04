import { ReactNode } from "react"
import { ThemeOptions } from "../../types"
import { ThemeContext } from "../index"

const ThemeProvider = ({ value, children }: { value: ThemeOptions, children: ReactNode }) => {
    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
}

export default ThemeProvider;