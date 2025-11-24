import MUIButton, {type ButtonProps as  MUIButtonProps} from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {cn} from "@/lib/utils.ts";
import MUIIconButton, {type IconButtonProps as MUIIconButtonProps} from "@mui/material/IconButton";

type OldButtonSize = "small" | "medium" | "large";
type ButtonSize = "extraSmall" | "bigLarge" | OldButtonSize;
type ButtonProps = Omit<MUIButtonProps, "size"> & {
    size?: ButtonSize;
};


export const Button = styled(
    ({ className, size = "medium", variant = "contained", ...props }: ButtonProps) => {
        const sizeName = `${size.charAt(0).toUpperCase()}${size.slice(1)}`;
        const sizeClassName = `size${sizeName}`;
        const variantSize = `${variant}Size${sizeName}`;

        return (
            <MUIButton
                size={(["small", "medium", "large"].some(d => d ===size) ? size : "medium") as OldButtonSize}     // 统一给 MUI 合法 size
                variant={variant}
                classes={{
                    sizeMedium: "",
                    textSizeMedium: "",
                    containedSizeMedium: "",
                    outlinedSizeMedium: "",
                }}
                disableRipple
                className={cn(
                    className,
                    `normal-case flex items-center gap-1 MuiButton-${sizeClassName} MuiButton-${variantSize}`
                )}
                {...props}
            />
        );
    }
)(() => ({
    flexDirection: "row",
    fontWeight: "normal",

    "&.MuiButton-text": {
        "&:hover": {
            color: "var(--primary)",
            backgroundColor: "transparent",
        },
    },

    "&.MuiButton-contained": {
        boxShadow: "none",

    },

    "&.MuiButton-sizeExtraSmall": { fontSize: "13px" },
    "&.MuiButton-sizeSmall": { fontSize: "14px" },
    "&.MuiButton-sizeMedium": {
        fontSize: "16px", fontWeight: "bold",
        "@media (min-width: 1024px)": {
            fontWeight: "normal",
        },
    },
    "&.MuiButton-sizeLarge": {
        fontSize: "16px",
        fontWeight: "bold",
        "@media (min-width: 1024px)": {
            fontSize: "17px",
        },
    },

    "&.MuiButton-sizeBigLarge": {
        fontSize: "16px",
        fontWeight: "bold",
        "@media (min-width: 1024px)": {
            fontSize: "20px",
        },
    },
}));
export const IconButton = styled((props: MUIIconButtonProps) => {
    return <MUIIconButton disableRipple {...props} />;
})(() => {
    return ({
        "&:hover": {
            color: "var(--primary)",
            backgroundColor: "transparent",
        },
    })
});

export type { ButtonProps };
