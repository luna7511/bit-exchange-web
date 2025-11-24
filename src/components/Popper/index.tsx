import {styled} from "@mui/material/styles";
import MUIPopper, { type PopperProps } from "@mui/material/Popper";
import {cn} from "@/lib/utils.ts";

export const Popper = styled(({className, ...props}: PopperProps) => (
    <MUIPopper
        className={cn(className)}
        {...props}
    />
))(() => ({}));

export type {
    PopperProps
};