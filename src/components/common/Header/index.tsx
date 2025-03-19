"use client"

import ThemeSwitcher from "../ThemeSwitcher";
import { SidebarTrigger } from "../../ui/sidebar";
import { Separator } from "../../ui/separator";
import BreadcrumbHeader from "./BreadcrumbHeader";

export default function Header() {
  return (
    <header className="border-b py-2 h-12 px-3 flex justify-between items-center">
      <div className="flex gap-2 h-full items-center">
        <SidebarTrigger />
        <Separator orientation="vertical" className="!h-5" />
        <BreadcrumbHeader />
      </div>
      <div className="flex items-center">
        <nav>
          <ul className="flex space-x-2 items-center">
            <li><ThemeSwitcher /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
