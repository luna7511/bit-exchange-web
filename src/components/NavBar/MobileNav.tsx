import Box from "@mui/material/Box";
import { Button, IconButton, type ButtonProps } from "@/components/Button";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import {styled} from "@mui/material";
import {type MenuItemType} from "./types";
import MuiAccordion, {type AccordionProps} from "@mui/material/Accordion";
import MuiAccordionSummary, {type AccordionSummaryProps, accordionSummaryClasses} from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Fragment } from "react/jsx-runtime";
import {themeColor} from "@/theme";
import {useGlobalStore} from "@/store/useGlobalStore.ts";
import {type FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";


const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
    borderWidth: 0,
    padding: 0,
    backgroundColor: "transparent",
    color: "var(--default)",
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon className="text-base font-bold" />}
        {...props}
    />
))(() => ({
    backgroundColor: "transparent",
    flexDirection: 'row',
    padding: "8px",
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'left',
    minHeight: "auto",
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
        {
            transform: 'rotate(180deg)',
        },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: 0,
        padding: 0,
        margin: 0,
        display: "inline-flex",
        gap: "0.25rem",
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: "24px 8px",
    borderTop: '0 solid rgba(0, 0, 0, .125)',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: "20px",
}));


const DrawButton: FC<ButtonProps> = (props) => {
    return <Button
        variant="text"
        size="medium"
        sx={{
            justifyContent: "flex-start",
            "&:hover": {
                color: "var(--default) !important",
                backgroundColor: "transparent !important",
            },
        }}
        {...props}
    />
};

export default function MobileNav({
                                      open,
                                      onClose,
                                      menuItems,
                                      userMenuItems,
                                  }: {
    open: boolean;
    onClose: () => void;
    menuItems: MenuItemType[];
    userMenuItems: MenuItemType[];
}) {

    const theme = useGlobalStore(state => state.theme);

    const navigate = useNavigate();

    // -------------------------------
    // 监听屏幕宽度变化，并在 >= 1024 时自动关闭 Drawer
    // -------------------------------
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && open) {
                onClose();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [open, onClose]);

    return (
        <Drawer
            anchor="right" open={open} onClose={onClose}
            slotProps={{
                paper: {
                    className: "w-full!",
                    sx: {
                        backgroundColor: themeColor[theme].navBarColor,
                        backgroundImage: "none",
                    }
                }
            }}
        >
            <Box className="px-[12px] py-[16px] space-y-4">
                <Box className="flex justify-between items-center">
                    <Box className="text-xl font-bold">BitoPro</Box>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <div className="flex gap-5">
                    <Button variant="contained" color="info" size="medium" sx={{
                        borderRadius: '20px',
                        flex: 1,
                    }} onClick={() => navigate("/users/signIn")}>登录</Button>
                    <Button variant="contained" size="medium" sx={{
                        borderRadius: '20px',
                        flex: 1,
                    }} onClick={() => navigate("/users/signUp")}>注册</Button>
                </div>

                {/* --------- 菜单 --------- */}
                {menuItems.map((item) =>
                    item.children ? (
                        <Fragment key={item.label}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>

                                    {item.label}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        item.children?.map((child) => (
                                            <div key={child.label}>
                                                <DrawButton color="inherit" size="small">
                                                    {child.icon}
                                                    {child.label}
                                                </DrawButton>
                                            </div>
                                        ))
                                    }
                                </AccordionDetails>
                            </Accordion>
                        </Fragment>
                    ) : (
                        <div key={item.label}>
                            <DrawButton color="inherit" size="medium">
                                {item.label}
                            </DrawButton>
                        </div>
                    )
                )}

                <div>
                    <Divider className="my-4" />
                </div>

                {/* --------- 用户菜单 --------- */}
                {userMenuItems.map((item) =>
                    item.children ? (
                        <Fragment key={item.label}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    className="text-sm font-normal!"
                                    sx={{
                                        [`& .${accordionSummaryClasses.content}`]: {
                                            marginLeft: "-3px",
                                        },
                                    }}
                                >
                                    {item.icon}
                                    {item.label}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        item.children?.map((child) => (
                                            <div key={child.label}>
                                                <DrawButton color="inherit" size="small">
                                                    {child.icon}
                                                    {child.label}
                                                </DrawButton>
                                            </div>
                                        ))
                                    }
                                </AccordionDetails>
                            </Accordion>
                        </Fragment>
                    ) : (
                        <div key={item.label}>
                            <DrawButton color="inherit" size="small">
                                {item.icon}
                                {item.label}
                            </DrawButton>
                        </div>
                    )
                )}
            </Box>
        </Drawer>
    );
}