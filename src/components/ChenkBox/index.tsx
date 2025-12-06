import { styled } from '@mui/material/styles';
import MuiCheckbox, { type CheckboxProps, checkboxClasses } from '@mui/material/Checkbox';
import type {ReactNode} from "react";
import {cn} from "@/lib/utils";

export const CheckBox = styled(({
    label, boxClassName,
    ...props
                                }: CheckboxProps & {label?: string | ReactNode; boxClassName?: string}) => {
    return (
        <div className={cn("c-checkBox inline-flex items-center text-sm", boxClassName)}>
            <MuiCheckbox disableRipple {...props} />
            {label}
        </div>
    );
})(({ theme }) => ({
        [`&.${checkboxClasses.root}`]: {
            padding: theme.spacing(0.8),
            paddingLeft: 0,
        },
        [`&.${checkboxClasses.checked} svg`]: {
                // fill: "white"
        }
}));