import Box from "@mui/material/Box";
import MUIMenuItem, {type MenuItemProps} from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {type FC, type JSX, type ReactNode, useRef, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {styled} from "@mui/material/styles";
import {useGlobalStore} from "@/store/useGlobalStore.ts";
import {Paper} from "@/components/Paper";
import {Popper} from "@/components/Popper";
import {Button} from "@/components/Button";

export interface DrawMenuProps {
    triggerLabel?: string;
    triggerIcon?: JSX.Element | ReactNode;
    TriggerComponent?: ReactNode; // 自定义 Trigger
    children?: ReactNode[];
    hideArrow?: boolean;
}
export const DrawMenu: FC<DrawMenuProps> = ({
                                                triggerLabel,
                                                triggerIcon,
                                                TriggerComponent,
                                                hideArrow,
                                                children
                                            }) => {
    const hoverRef = useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleMouseLeave = (e: React.MouseEvent) => {
        const related = e.relatedTarget as HTMLElement;
        if (related instanceof Node && hoverRef.current?.contains(related)) return;
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const heightClass = "h-[var(--navbarHeight)]";
    return (
        <Box
            ref={hoverRef}
            className={cn("relative", heightClass)}
            onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
            onMouseLeave={handleMouseLeave}
        >
            {
                TriggerComponent || (
                    <Button
                        className={heightClass}
                        color="inherit"
                        variant="text"
                    >
                        {triggerIcon}
                        {triggerLabel}
                        {
                            !hideArrow && (
                                <div  className={cn([
                                    "transition-all duration-200 ease-in-out inline-block ml-1",
                                    open ? "rotate-180" : "",
                                ])}>
                                    <ExpandMoreIcon />
                                </div>
                            )
                        }
                    </Button>
                )
            }

            {/* Hover Paper */}
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
                container={hoverRef.current}
                modifiers={[{ name: "offset", options: {offset: [0, 0] } }]}
            >
                <Paper
                    onMouseLeave={handleMouseLeave}
                    // className="min-w-[200px]"
                >
                    {children?.map((child) => child)}
                </Paper>
            </Popper>
        </Box>
    )
}

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
export interface DrawMenuItem {
    label?: string | ReactNode;
    description?: string | ReactNode;
    icon?: JSX.Element | ReactNode;
    children?: ReactNode[];
    className?: string;
}
export const DrawMenuItem: FC<DrawMenuItem> = ({
                                                   icon, label, description, children, className,
                                               }) => {
    const theme = useGlobalStore(state => state.theme);
    return (
        <MenuItem className={cn("min-w-[180px]", className)}>
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