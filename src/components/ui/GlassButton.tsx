import React from 'react';
import Link from 'next/link';

interface GlassButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * Reusable GlassButton supporting buttons and Next.js Links.
 * Follows Apple touch target guidelines (min 44px) and physical press feedback.
 */
export function GlassButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  type = 'button',
  disabled = false,
  ariaLabel,
}: GlassButtonProps) {
  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 min-h-[36px]',
    md: 'text-sm px-5 py-2.5 min-h-[44px]',
    lg: 'text-base px-6 py-3 min-h-[48px] font-medium',
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600
      text-white
      shadow-[0_4px_14px_rgba(2,132,199,0.35),inset_0_1px_1px_rgba(255,255,255,0.7)]
      border border-sky-300/60
      dark:from-sky-500 dark:to-sky-700
      dark:border-sky-400/30
    `,
    secondary: `
      glass-surface
      text-slate-100
      border border-sky-400/25
    `,
    ghost: `
      bg-transparent
      text-slate-200
      hover:text-white
      border border-transparent
    `,
  };

  const baseStyles = `
    group/btn relative overflow-hidden
    inline-flex items-center justify-center gap-2
    rounded-full font-medium
    apple-press
    focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2
    select-none
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${disabled ? 'opacity-50 pointer-events-none' : ''}
    ${className}
  `;

  const content = (
    <>
      {/* GPU-Composited Hover Overlays: zero repaint, pure compositor opacity */}
      {variant === 'primary' && (
        <span
          className="absolute inset-0 rounded-full bg-white/18 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-75 ease-out pointer-events-none"
          aria-hidden="true"
        />
      )}
      {variant === 'secondary' && (
        <span
          className="absolute inset-0 rounded-full bg-slate-800/65 border border-sky-400/50 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-75 ease-out pointer-events-none"
          aria-hidden="true"
        />
      )}
      {variant === 'ghost' && (
        <span
          className="absolute inset-0 rounded-full bg-sky-500/15 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-75 ease-out pointer-events-none"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseStyles}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseStyles} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
