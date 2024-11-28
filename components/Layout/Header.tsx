"use client";
import Link from "next/link";
import Image from "next/image";
import {
  IoIosNotificationsOutline,
  IoIosHelpCircleOutline,
  IoIosSearch,
  IoMdPerson,
} from "react-icons/io";
import { MdKeyboardCommandKey } from "react-icons/md";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { usePathname } from "next/navigation";


const links = [
  { href: "/", label: "Overview" },
  { href: "/tasks", label: "Tasks" },
  { href: "/projects", label: "Projects" },
  { href: "/payments", label: "Payments" },
  { href: "/users", label: "Users" }
];

export default function Header({ maxWidth }: { maxWidth: string }) {
  const pathname = usePathname();

  return (
    <header
      className={`w-full flex flex-col items-center justify-between  py-3 border-b gap-5 border-black/[.08] dark:border-white/[.145]`}
    >
      <nav
        className={` max-w-[${maxWidth}] w-full mx-auto flex items-center justify-between px-10 pt-2`}
      >
        <div className="flex items-center gap-4 ">
          <Link href="/" className="font-medium">
            <Image
              src="/mocks/header/logo.png"
              alt="Logo"
              width={24}
              height={24}
            />
          </Link>
          <div className="flex items-center gap-3 border-l border-black/[.08] dark:border-white/[.145] h-full pl-4">
            <Image
              src="/mocks/header/Te.png"
              alt="Home"
              width={24}
              height={24}
            />
            <p className="text-sm">Teqqed</p>
            <div className="flex flex-col items-center">
              <SlArrowUp size={10} className="cursor-pointer" />
              <SlArrowDown size={10} className="cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="flex items-center gap-4 border border-black/[.08] dark:border-white/[.145] rounded-lg p-2 bg-[#F9F9F8]">
            <IoIosSearch size={24} />
            <input
              type="text"
              placeholder="Search"
              className="hidden md:block bg-transparent"
            />
            <div className="bg-white rounded-lg px-2 shadow-sm flex items-center gap-1">
              <MdKeyboardCommandKey />K
            </div>
          </div>
          <Link
            href="/"
            className="text-sm hover:text-black/70 dark:hover:text-white/70 transition-colors"
          >
            <IoIosNotificationsOutline size={24} />
          </Link>
          <Link
            href="/"
            className="text-sm hover:text-black/70 dark:hover:text-white/70 transition-colors"
          >
            <IoIosHelpCircleOutline size={24} />
          </Link>
          <Link
            href="/"
            className="text-sm hover:text-black/70 dark:hover:text-white/70 transition-colors"
          >
            <Image
              src="/mocks/header/Te.png"
              alt="Home"
              width={26}
              height={26}
            />
          </Link>
        </div>
      </nav>
      <div className="w-full h-[1px] bg-black/[.08] dark:bg-white/[.145]"></div>
      <div
        className={`max-w-[${maxWidth}] w-full  mx-auto flex items-center gap-6  dark:border-white/[.145]  px-10`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm ${
              pathname === link.href
                ? "font-bold text-black dark:text-white cursor-default"
                : "text-black/50 dark:text-white/50 hover:text-black/70 dark:hover:text-white/70"
            } transition-colors`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
