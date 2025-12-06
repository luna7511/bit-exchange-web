import Box from "@mui/material/Box";
import MUIMenuItem, {type MenuItemProps} from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Children, cloneElement, type FC, isValidElement, type JSX, type ReactNode, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {styled} from "@mui/material/styles";
import {useGlobalStore} from "@/store/useGlobalStore.ts";
import {Paper} from "@/components/Paper";
import {Popper} from "@/components/Popper";
import {Button} from "@/components/Button";
import type {PopperProps} from "@mui/material/Popper";
import type {PaperProps} from "@mui/material/Paper";

export interface DrawMenuProps {
    triggerClass?: string;
    triggerLabel?: string | ReactNode;
    triggerIcon?: JSX.Element | ReactNode;
    TriggerComponent?: ReactNode;
    hideArrow?: boolean;
    children?: ReactNode;
    direction?: "horizontal" | "vertical";
    slot?: {
        Popper?: PopperProps;
        Paper?: PaperProps
    };
    className?: string;


    /** 新增 --- 外部控制 open */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const DrawMenu: FC<DrawMenuProps> = ({
                                                triggerClass,
                                                triggerLabel,
                                                triggerIcon,
                                                TriggerComponent,
                                                hideArrow,
                                                children,
                                                className,
                                                open: controlledOpen,
                                                onOpenChange,
                                                direction="vertical",
                                                slot
                                            }) => {
    const hoverRef = useRef<HTMLDivElement>(null);

    /** 内部状态（若使用外部 open，则内部状态不会生效） */
    const [internalOpen, setInternalOpen] = useState(false);

    const open = controlledOpen ?? internalOpen;

    const setOpen = (value: boolean) => {
        if (onOpenChange) onOpenChange(value);
        else setInternalOpen(value);
    };


    return (
        <Box
            ref={hoverRef}
            className={cn("relative", className)}
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {/* Trigger */}
            <div className="flex items-center">
                {TriggerComponent || (
                    <Button
                        className={cn(
                            triggerClass,
                        )}
                        color="inherit"
                        variant="text"
                        sx={{
                            paddingInline: "12px !important",
                            "&:hover": {
                                backgroundColor: "transparent"
                            }
                        }}
                    >
                        {triggerLabel}
                    </Button>
                )}
                {!hideArrow && (
                    <div
                        className={cn(
                            "transition-all duration-200 flex items-center justify-center",
                            open ? "rotate-180" : ""
                        )}
                        style={{ transformOrigin: "center" }}
                    >
                        {triggerIcon || <ExpandMoreIcon className="ml-1" />}
                    </div>
                )}
            </div>


            {/* Popper */}
            <Popper
                open={open}
                anchorEl={hoverRef.current}
                placement="bottom-start"
                modifiers={[{ name: "offset", options: { offset: [0, 1] } }]}
                {...slot?.Popper}
            >
                <Paper
                    {...slot?.Paper}
                    onMouseLeave={() => setOpen(false)}
                    sx={
                        direction === "horizontal" ? {
                            display: "flex",
                            maxWidth: "calc(100vw - 40px)",
                            flexWrap: "wrap",
                            "@media (min-width: 1024px)": {
                                maxWidth: "500px"
                            },
                            ...slot?.Paper?.sx
                        } : {...slot?.Paper?.sx}
                    }

                >
                    {Children.map(children, (child) => {
                        if (!isValidElement(child)) return child;

                        /** 只有 DrawMenuItem 才注入 closeMenu */
                        if (child.type === DrawMenuItem) {
                            return cloneElement(child, {
                                closeMenu: () => setOpen(false),
                            });
                        }

                        return child;
                    })}
                </Paper>
            </Popper>
        </Box>
    );
};

const MenuItem = styled(({className, ...props}: MenuItemProps) => (
    <MUIMenuItem
        disableRipple
        className={cn(className, "flex items-center gap-3 transition-all duration-150")}
        {...props}
    />
))(({ theme }) => ({
    minHeight: "50px !important",
    paddingBlock: "calc(var(--spacing) * 2)",
    paddingInline: "calc(var(--spacing) * 3)",
    borderRadius: "var(--radius-lg)",
    "&:hover": {
        backgroundColor: "color-mix(in oklab, var(--primary) 5%, transparent)",
    },
    ...theme.applyStyles('dark', {
        "&:hover": {
            backgroundColor: "color-mix(in oklab, #fff 5%, transparent)",
        },
    }),
}));
export interface DrawMenuItem extends MenuItemProps{
    label?: string | ReactNode;
    description?: string | ReactNode;
    icon?: JSX.Element | ReactNode;
    children?: ReactNode[];
    className?: string;
    closeMenu?: () => void
}
export const DrawMenuItem: FC<DrawMenuItem> = ({
                                                   icon, label, description, children, className, closeMenu, onClick, ...props
                                               }) => {
    const theme = useGlobalStore(state => state.theme);

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        onClick?.(e); // 调用原有 onClick
        closeMenu?.();      // 关闭 DrawMenu
    };
    return (
        <MenuItem className={cn("min-w-[180px]", className)} onClick={handleClick} {...props}>
            {icon}

            {
                (label || description) && (
                    <div>
                        {
                            typeof label === "string" ? <div className="text-base">{label}</div> : label
                        }
                        {
                            typeof description === "string" ? <div className={`text-sm ${theme === "light" ? "text-[var(--default)]/50" : "text-white"}`}>{description}</div> : description
                        }
                    </div>
                )
            }
            {children?.map((child) => child)}
        </MenuItem>
    )
}