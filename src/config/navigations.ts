import {
    FileText,
    Home,
    Inbox,
    TestTubeDiagonal,
    type LucideIcon
} from "lucide-react";


export interface NavItemConfig {
    name: string;
    icon: LucideIcon;
    href: string;
}

export interface NavGroupConfig {
    name: string;
    collapsible: boolean;
    children: NavItemConfig[];
    isOpenByDefault?: boolean;
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
    },

    {
        name: "Numbers",
        collapsible: true,
        isOpenByDefault: false,
        children: [
            {
                name: "One",
                icon: TestTubeDiagonal,
                href: "/one",
            },
            {
                name: "Two",
                icon: TestTubeDiagonal,
                href: "/one/two",
            },
            {
                name: "Three",
                icon: TestTubeDiagonal,
                href: "/one/two/three",
            }
        ]
    }
]

export default navigationData;