'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { MailIcon, LinkedinIcon, GithubIcon, YoutubeIcon, GamepadIcon } from '@/components/ui/Icons';

const ICON = 'w-1/2 h-1/2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]';

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
  </svg>
);

/**
 * Handheld-console-style home screen: glossy round icons in staggered rows, a label under each.
 * Positions are grid columns (each icon spans two): 8 columns on wider screens, 6 on phones,
 * so the rows interlock like a honeycomb either way.
 */
export function ContactBubbles() {
  const [copied, setCopied] = useState<'yes' | 'failed' | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contactEmail);
      setCopied('yes');
    } catch {
      setCopied('failed');
    }
    setTimeout(() => setCopied(null), 2000);
  };

  const external = { target: '_blank', rel: 'noopener noreferrer' };
  const items = [
    { label: 'Email me', color: '#2563eb', at: [1, 2], phoneAt: [1, 2], icon: <MailIcon className={ICON} />, link: { href: siteConfig.socials.email } },
    {
      label: copied === 'yes' ? 'Copied!' : copied === 'failed' ? "Couldn't copy" : 'Copy email',
      sub: siteConfig.contactEmail,
      color: '#0d9488',
      at: [1, 4],
      phoneAt: [1, 4],
      icon: <CopyIcon />,
      onClick: copyEmail,
    },
    // Placeholder until the public CV is ready
    { label: 'Download CV', sub: 'Coming soon', color: '#d97706', at: [1, 6], phoneAt: [3, 4], icon: <DownloadIcon />, onClick: () => {} },
    { label: 'LinkedIn', color: '#0a66c2', at: [2, 1], phoneAt: [2, 1], icon: <LinkedinIcon className={ICON} />, link: { href: siteConfig.socials.linkedin, ...external } },
    { label: 'GitHub', color: '#3f4654', at: [2, 3], phoneAt: [2, 3], icon: <GithubIcon className={ICON} />, link: { href: siteConfig.socials.github, ...external } },
    { label: 'YouTube', color: '#dc2626', at: [2, 5], phoneAt: [2, 5], icon: <YoutubeIcon className={ICON} />, link: { href: siteConfig.socials.youtube, ...external } },
    { label: 'itch.io', sub: 'My games', color: '#7c3aed', at: [2, 7], phoneAt: [3, 2], icon: <GamepadIcon className={ICON} />, link: { href: siteConfig.socials.itch, ...external } },
  ];

  return (
    <div className="orb-grid max-w-3xl mx-auto px-4 sm:px-6">
      {items.map((item) => {
        const style = {
          '--orb': item.color,
          '--row': item.at[0],
          '--col': item.at[1],
          '--phone-row': item.phoneAt[0],
          '--phone-col': item.phoneAt[1],
        } as React.CSSProperties;
        const inner = (
          <>
            <span className="orb">{item.icon}</span>
            {/* aria-live so screen readers hear "Copied!" */}
            <span className="orb-label" aria-live={item.onClick ? 'polite' : undefined}>
              {item.label}
            </span>
            {item.sub && <span className="orb-sub">{item.sub}</span>}
          </>
        );
        return item.link ? (
          <a key={item.color} {...item.link} className="orb-item apple-press" style={style}>
            {inner}
          </a>
        ) : (
          <button key={item.color} type="button" onClick={item.onClick} className="orb-item apple-press" style={style}>
            {inner}
          </button>
        );
      })}
    </div>
  );
}
