import { createTheme } from '@mui/material/styles';
import {commonTheme} from "@/theme/common.ts";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "rgb(49, 95, 238)",       // Tailwind Indigo-500
            dark: "rgb(49, 95, 238)",
            contrastText: "#fff",
        },
        secondary: {
            main: "rgb(48, 52, 63)",
            dark: "rgb(48, 52, 63)",
            contrastText: "#fff",
        },
        info: {
            main: "rgb(48, 52, 63)",
            dark: "rgb(48, 52, 63)",
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
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#1a1a1a",
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: "14px",
                    backgroundColor: "#1a1a1a",
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.165), rgba(255, 255, 255, 0.165))"
                }
            }
        }
    }
});

export default darkTheme;