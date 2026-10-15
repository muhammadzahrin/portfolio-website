import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Section } from '@/components/ui/Section';

export default function NotFound() {
  return (
    <div className="pb-16 pt-8">
      <Section id="not-found" className="text-center">
        <GlassCard className="p-8 sm:p-12 max-w-lg mx-auto">
          <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-400 block mb-2">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            The requested page does not exist in this template outline.
          </p>
          <GlassButton href="/" variant="primary" size="md">
            <span>Return to Home</span>
          </GlassButton>
        </GlassCard>
      </Section>
    </div>
  );
}
