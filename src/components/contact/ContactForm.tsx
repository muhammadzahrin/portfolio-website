'use client';

import React, { useState } from 'react';
import { GlassButton } from '@/components/ui/GlassButton';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
        >
          Your Name
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          placeholder="[Enter your name]"
          className="w-full px-4 py-2.5 rounded-xl glass-surface text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-white/60 dark:border-white/10"
          disabled
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
        >
          Your Email
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          placeholder="[Enter your email]"
          className="w-full px-4 py-2.5 rounded-xl glass-surface text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-white/60 dark:border-white/10"
          disabled
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="[Enter message text placeholder]"
          className="w-full px-4 py-2.5 rounded-xl glass-surface text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-white/60 dark:border-white/10 resize-none"
          disabled
        />
      </div>

      {submitted && (
        <div className="p-3 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-200 text-xs">
          Thank you! Please feel free to use the direct email link on the left to reach me directly anytime.
        </div>
      )}

      <div className="pt-2">
        <GlassButton
          type="submit"
          variant="primary"
          size="md"
          className="w-full sm:w-auto"
        >
          <span>Send Message</span>
        </GlassButton>
      </div>
    </form>
  );
}
