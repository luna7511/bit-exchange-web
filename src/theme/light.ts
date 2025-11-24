import { createTheme } from '@mui/material/styles';
import {commonTheme} from "@/theme/common.ts";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: "rgb(49, 95, 238)",       // Tailwind Indigo-500
            light: "rgb(247, 249, 253)",
            dark: "rgb(49, 95, 238)",
            contrastText: "#fff",
        },
        secondary: {
            main: "rgb(237, 240, 247)",
            dark: "rgb(237, 240, 247)",
            contrastText: "#fff",
        },
        info: {
            main: "rgb(237, 240, 247)",
            dark: "rgb(237, 240, 247)",
        },
        error: {
            main: "#f54751",
            dark: "#f54751",
        },
        success: {
            main: "#04a981",
            dark: "#04a981",
        },
        background: {
            default: "#fff",    // Tailwind Gray-50
            paper: "#fff",
        },
    },
    ...commonTheme,
});

export default lightTheme;