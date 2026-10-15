import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';
import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { ContactForm } from '@/components/contact/ContactForm';
import { Section } from '@/components/ui/Section';
import {
  MailIcon,
  LinkedinIcon,
  GithubIcon,
  YoutubeIcon,
  ExternalLinkIcon,
} from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Contact | Zahrin',
  description:
    'Contact Zahrin - reach out via email, LinkedIn, GitHub, or YouTube.',
};

export default function ContactPage() {
  return (
    <div className="pb-10">
      {/* Exactly one single <h1> */}
      <PageHeader
        title="Contact"
        subtitle="Connect for collaboration on software, interactive media, or game development."
      />

      <Section id="contact-channels" className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Links Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Direct Channels
            </h2>

            {/* Email Card */}
            <GlassCard className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-300 flex items-center justify-center shrink-0">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Email
                  </span>
                  <a
                    href={siteConfig.socials.email}
                    className="text-sm sm:text-base font-medium text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors break-all"
                  >
                    {siteConfig.contactEmail}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    [Direct email link placeholder]
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* LinkedIn Card */}
            <GlassCard className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-600/10 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    LinkedIn
                  </span>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm sm:text-base font-medium text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <span>Connect on LinkedIn</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    [LinkedIn profile link placeholder]
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* GitHub Card */}
            <GlassCard className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800/10 dark:bg-slate-200/10 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    GitHub
                  </span>
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm sm:text-base font-medium text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <span>github.com/muhammadzahrin</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Code repositories and prototypes
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* YouTube Card */}
            <GlassCard className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                  <YoutubeIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    YouTube
                  </span>
                  <a
                    href={siteConfig.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm sm:text-base font-medium text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <span>YouTube Channel</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    [YouTube channel link placeholder]
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Contact Section / Form Interface (7 cols) */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 sm:p-8">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white">
                  Message Interface
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Send a message directly using the form below or reach out via email and LinkedIn.
              </p>

              {/* Accessible Form Placeholder */}
              <ContactForm />
            </GlassCard>
          </div>
        </div>
      </Section>
    </div>
  );
}
