import {
    FileText,
    Home,
    Inbox,
    type LucideIcon
} from "lucide-react";


export interface NavItemConfig {
    name: string;
    icon: LucideIcon;
    href: string;
    requireAuth?: boolean;
}

export interface NavGroupConfig {
    name: string;
    collapsible: boolean;
    children: NavItemConfig[];
    isOpenByDefault?: boolean;
    requireAuth?: boolean;
}

export type NavigationEntry = NavItemConfig | NavGroupConfig;

export function isNavGroup(entry: NavigationEntry): entry is NavGroupConfig {
    return (entry as NavGroupConfig).children !== undefined;
}

const navigationData: NavigationEntry[] = [
    {
        name: "Home",
        icon: Home,
        href: "/"
    },
    {
        name: "About",
        icon: FileText,
        href: "/about"
    },
    {
        name: "Contact",
        icon: Inbox,
        href: "/contact"
    }
]

export default navigationData;