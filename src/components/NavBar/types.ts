import type {JSX, ReactNode} from "react";

export interface MenuItemType {
    label: string;
    desc?: string;
    icon?: ReactNode | JSX.Element;
    children?: MenuItemType[];
    href?: string;
}