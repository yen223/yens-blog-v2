import React from "react";
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from "@headlessui/react";
import clsx from "clsx";

import { Link, NavLink } from "@remix-run/react";

function DesktopLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={href}
      prefetch="intent"
      end
      className={({ isActive }) => clsx(isActive && "active")}
    >
      {children}
    </NavLink>
  );
}

function MobileNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <PopoverButton as={Link} to={href}>
        {children}
      </PopoverButton>
    </li>
  );
}

function MobileNavigation() {
  return (
    <Popover className="site-nav-mobile">
      <PopoverButton className="mobile-menu-button">Menu</PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-6 z-50 origin-top mobile-menu-panel duration-150 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <nav>
          <ul>
            <MobileNavItem href="/">Writing</MobileNavItem>
            <MobileNavItem href="/articles">Articles</MobileNavItem>
            <MobileNavItem href="/projects">Projects</MobileNavItem>
            <MobileNavItem href="/about">About</MobileNavItem>
          </ul>
        </nav>
      </PopoverPanel>
    </Popover>
  );
}

function DesktopNavigation() {
  return (
    <div className="nav-links">
      <DesktopLink href="/">Writing</DesktopLink>
      <DesktopLink href="/articles">Articles</DesktopLink>
      <DesktopLink href="/projects">Projects</DesktopLink>
      <DesktopLink href="/about">About</DesktopLink>
      <a className="feed" href="/feed/all">
        feed ⌁
      </a>
    </div>
  );
}

export function Header() {
  return (
    <nav className="site-nav">
      <Link to="/" className="wordmark" prefetch="intent">
        <span>
          Wei <span style={{ color: "var(--accent)" }}>Yen</span>
        </span>
      </Link>
      <DesktopNavigation />
      <MobileNavigation />
    </nav>
  );
}
