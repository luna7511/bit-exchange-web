import Tabs, {tabsClasses} from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export interface AuthTabConfig {
    label: string;
    value: string;
}

interface AuthTabsProps {
    value: string;
    onChange: (value: string) => void;
    tabs: AuthTabConfig[];
}

export default function AuthTabs({ value, onChange, tabs }: AuthTabsProps) {
    return (
        <Tabs
            value={value}
            variant="fullWidth"
            onChange={(_, newValue) => onChange(newValue)}
            sx={{
                marginBlock: "12px",
                [`& .${tabsClasses.indicator}`]: {
                    backgroundColor: "#fff",
                },
            }}
        >
            {tabs.map((item) => (
                <Tab
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    disableRipple
                    sx={{
                        color: "rgba(255,255,255,0.5)",
                        "&.Mui-selected": { color: "#fff" },
                    }}
                />
            ))}
        </Tabs>
    );
}