'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/siteConfig';
import { MenuIcon, CloseIcon, SparklesIcon } from '@/components/ui/Icons';

/**
 * Responsive translucent glass navigation bar.
 * Follows Apple's floating layer guideline: content scrolls underneath,
 * translucent material with bright top edge catching the light.
 */
export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
      <nav
        className="max-w-5xl mx-auto glass-surface rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-glass-dark-md border border-sky-400/20"
        aria-label="Main Navigation"
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 group apple-press focus-visible:ring-2 focus-visible:ring-sky-500 rounded-full py-1 px-2"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-emerald-400 flex items-center justify-center text-white shadow-sm shadow-sky-500/40">
            <SparklesIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-sky-400 transition-colors duration-75 ease-out">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative group/nav px-3.5 py-1.5 rounded-full text-sm font-medium apple-press overflow-hidden
                  focus-visible:ring-2 focus-visible:ring-sky-500
                  ${
                    isActive
                      ? 'text-sky-300 bg-sky-500/20 shadow-inner border border-sky-400/30'
                      : 'text-slate-300 hover:text-white'
                  }
                `}
              >
                {!isActive && (
                  <span
                    className="absolute inset-0 rounded-full bg-white/12 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-75 ease-out pointer-events-none"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="apple-press w-9 h-9 rounded-full glass-surface flex items-center justify-center text-slate-200 focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden mt-2 max-w-5xl mx-auto glass-surface rounded-2xl p-4 shadow-glass-lg dark:shadow-glass-dark-lg border border-white/70 dark:border-white/15 animate-in fade-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col gap-1.5">
            {siteConfig.navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`
                    px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-75 ease-out apple-press flex items-center justify-between
                    ${
                      isActive
                        ? 'text-sky-700 dark:text-sky-300 bg-sky-500/15 dark:bg-sky-400/20'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-white/40 dark:hover:bg-slate-800/40'
                    }
                  `}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{item.description}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
