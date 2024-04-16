import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Vercel from "@/icons/Vercel";

const links = ["About", "Contact"];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b px-4 py-2 backdrop-blur">
      <Vercel />
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <Link key={link} href={`/${link.toLowerCase()}`} className="link">
            {link}
          </Link>
        ))}
        <ModeToggle />
      </div>
    </header>
  );
}
