import TemplateMark from "@/icons/TemplateMark";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

const links = ["About", "Contact"];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b px-4 py-2 backdrop-blur">
      <Link href="/">
        <TemplateMark />
      </Link>
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <Link key={link} href={`/${link.toLowerCase()}`} className="link">
            {link}
          </Link>
        ))}
        <ThemeSwitcher />
      </div>
    </header>
  );
}
