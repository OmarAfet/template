import {
    FileText,
    Home,
    Inbox,
    TestTubeDiagonal
} from "lucide-react";

const navigationData = [
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
        name: "One",
        icon: TestTubeDiagonal,
        href: "/one"
    },
    {
        name: "Two",
        icon: TestTubeDiagonal,
        href: "/one/two"
    },
    {
        name: "Three",
        icon: TestTubeDiagonal,
        href: "/one/two/three"
    }
]

export default navigationData;