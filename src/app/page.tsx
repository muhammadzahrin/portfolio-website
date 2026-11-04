import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { workExperiences } from '@/data/experience';
import { memoriesData } from '@/data/memories';
import { GlassButton } from '@/components/ui/GlassButton';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { Slideshow } from '@/components/home/Slideshow';
import { HomeProjects } from '@/components/home/HomeProjects';

const PLACEHOLDER_COLORS = ['#2f7fd6', '#2a9d8f', '#8e5bd6', '#d6862f'];

// Events and education from the About page, each showing its first photo
const meSlides = memoriesData
  .filter((m) => m.category === 'event' || m.category === 'education')
  .map((m, i) => ({ id: m._id, caption: m.title, image: m.photos?.[0], color: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length] }));

export default function HomePage() {
  const job = workExperiences.find((w) => w.isCurrent);

  return (
    <div className="home max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col justify-center gap-5 md:gap-8">
      <section>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
          Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">{siteConfig.name}</span>.
        </h1>
        <p className="mt-2 text-base sm:text-xl text-slate-200">{siteConfig.tagline}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          {job && (
            <Link
              href="/experience"
              aria-label={`Currently ${job.role} at ${job.organisation}`}
              className="group relative flex items-center gap-2.5 rounded-full"
            >
              <span className="text-xs text-slate-400">Currently</span>
              <span className="apple-press w-11 h-11 shrink-0 rounded-full glass-surface border border-sky-400/30 flex items-center justify-center overflow-hidden text-xs font-bold text-white group-hover:border-sky-300/70">
                {job.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={job.logo} alt="" className="w-7 h-7 object-contain" />
                ) : (
                  job.organisation.split(' ').map((w) => w[0]).join('').slice(0, 2)
                )}
              </span>
              {/* Phones can't hover, so the role is always written out there */}
              <span className="md:hidden text-sm text-slate-300">
                {job.role} · {job.organisation}
              </span>
              <span className="hidden md:block pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg glass-surface border border-white/10 px-3 py-1.5 text-xs text-slate-200 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {job.role} · <span className="font-semibold text-white">{job.organisation}</span>
              </span>
            </Link>
          )}

          <GlassButton href="/contact" variant="primary" size="md">
            <span>Get in touch</span>
            <ArrowRightIcon className="w-4 h-4" />
          </GlassButton>
        </div>
      </section>

      <div className="home-panels">
        <Slideshow slides={meSlides} href="/about" label="About me" className="aspect-[4/3]" />
        <HomeProjects />
      </div>
    </div>
  );
}
