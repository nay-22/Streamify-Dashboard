import { ThemeOptions } from "../types"

export const darkTheme: ThemeOptions = {
    background: {
        primary: 'bg-dark-bg-primary',
        secondary: 'bg-dark-bg-secondary',
        tertiary: 'bg-dark-bg-tertiary',
        accent: 'bg-gradient-to-b from-[#6A0E58] to-[#2A0476]'
    },
    text: {
        primary: 'text-dark-text-primary',
        secondary: 'text-dark-text-secondary',
        tertiary: 'text-dark-text-tertiary',
        accent: 'text-dark-text-accent'
    }
}

export const lightTheme: ThemeOptions = {
    background: {
        primary: 'bg-light-bg-primary',
        secondary: 'bg-light-bg-secondary',
        tertiary: 'bg-light-bg-tertiary',
        accent: 'bg-gradient-to-b from-[#FFA3ED] to-[#BE9DFF]'
    },
    text: {
        primary: 'text-light-text-primary',
        secondary: 'text-light-text-secondary',
        tertiary: 'text-light-text-tertiary',
        accent: 'text-light-text-accent'
    }
}