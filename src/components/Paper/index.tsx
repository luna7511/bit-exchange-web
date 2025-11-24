import {styled} from "@mui/material/styles";
import MUIPaper, { type PaperProps } from "@mui/material/Paper";
import {cn} from "@/lib/utils.ts";

// className="rounded-lg border-2 border-white/20! p-3 min-w-[200px] transition-all duration-200"
// sx={{
//     backgroundColor: "var(--navbarBg)",
// }}
export const Paper = styled(({className, ...props}: PaperProps) => (
    <MUIPaper
        className={cn(className, "p-3")}
        {...props}
    />
))(({theme}) => ({
    backgroundColor: "var(--navbarBg)",
    boxShadow: "0px 0px 1px -1px rgba(0,0,0,0.2),0px 0px 1px 0px rgba(0,0,0,0.2),0px 1px 3px 0px rgba(0,0,0,0.2)",
    ...theme.applyStyles('dark', {
        boxShadow: "0px 0px 1px -1px rgba(255,255,255,0.2),0px 0px 1px 0px rgba(255,255,255,0.2),0px 1px 3px 0px rgba(255,255,255,0.2)",
    }),
}));

export type {
    PaperProps
};