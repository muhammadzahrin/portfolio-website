'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/siteConfig';
import { SparklesIcon } from '@/components/ui/Icons';

/**
 * Glossy black tab bar pinned to the top, in the style of a 2000s media player:
 * every page is a tab, and the current one is a lit blue pill with a small arrow under it.
 */
export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="media-bar sticky top-0 z-50 w-full">
      <nav className="max-w-5xl mx-auto h-11 px-2 sm:px-6 lg:px-8 flex items-center gap-3" aria-label="Main Navigation">
        {/* Brand: dropped on phones so all five tabs fit */}
        <Link
          href="/"
          className="hidden sm:flex shrink-0 items-center gap-2 group apple-press focus-visible:ring-2 focus-visible:ring-sky-500 rounded-full"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-emerald-400 flex items-center justify-center text-white shadow-sm shadow-sky-500/40">
            <SparklesIcon className="w-4 h-4 text-white" />
          </div>
          {/* On Home the big title already says it; still read out to screen readers there */}
          <span className={pathname === '/' ? 'sr-only' : 'hidden lg:inline font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors duration-75 ease-out'}>
            {siteConfig.name}
          </span>
        </Link>

        <ul className="flex flex-1 items-center justify-around">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className="media-tab block px-2.5 sm:px-6 pt-1 pb-1.5 text-[13px] sm:text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
