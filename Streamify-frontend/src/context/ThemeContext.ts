import { createContext } from "react";
import { ThemeOptions } from "../types";

/**
 * Create ThemeContext
 */
const ThemeContext = createContext<ThemeOptions>({});

export default ThemeContext;
