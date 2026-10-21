import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import {
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
  MailIcon,
} from '@/components/ui/Icons';

/**
 * Shared translucent glass footer with social links and template status.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-10 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto glass-surface rounded-3xl p-6 sm:p-8 border border-sky-400/20 shadow-glass-dark-sm flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-bold text-white tracking-tight">
              {siteConfig.name}’s Portfolio
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Personal portfolio built with Next.js, TypeScript, and dynamic glass aesthetics.
          </p>
        </div>

        {/* Center/Right: Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="apple-press w-9 h-9 rounded-full glass-surface flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-sm"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="apple-press w-9 h-9 rounded-full glass-surface flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-sm"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube Channel"
            className="apple-press w-9 h-9 rounded-full glass-surface flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-sm"
          >
            <YoutubeIcon className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.email}
            aria-label="Send an Email"
            className="apple-press w-9 h-9 rounded-full glass-surface flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-sm"
          >
            <MailIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-4 px-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          © {currentYear} {siteConfig.name}. All project names and descriptions are template placeholders.
        </p>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider px-2.5 py-0.5 rounded-full bg-sky-950/30 border border-sky-400/20 text-sky-400/90 shadow-sm select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            v0.1.12
          </span>
        </div>
      </div>
    </footer>
  );
}
