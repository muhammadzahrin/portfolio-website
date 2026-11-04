import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { workExperiences } from '@/data/experience';
import { memoriesData } from '@/data/memories';
import { Bubble } from '@/components/home/Bubble';
import { Slideshow } from '@/components/home/Slideshow';
import { HomeProjects } from '@/components/home/HomeProjects';
import { IntroSplash } from '@/components/home/IntroSplash';

const PLACEHOLDER_COLORS = ['#2f7fd6', '#2a9d8f', '#8e5bd6', '#d6862f'];

// Events and education from the About page, each showing its first photo
const meSlides = memoriesData
  .filter((m) => m.category === 'event' || m.category === 'education')
  .map((m, i) => ({ id: m._id, caption: m.title, image: m.photos?.[0], color: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length] }));

export default function HomePage() {
  const job = workExperiences.find((w) => w.isCurrent);
  const [taglineStart, ...rest] = siteConfig.tagline.split(',');
  const taglineEnd = rest.join(',').trim();

  return (
    // Same width and top padding as PageHeader, so the heading lines up with the other pages
    <div className="home max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-4 flex flex-col gap-6 md:gap-10">
      <section>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
          Hi, I’m <span data-intro-target className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">{siteConfig.name}</span>.
        </h1>
        {/* Phones: each half of the tagline on its own line */}
        <p className="mt-3 text-base sm:text-xl text-slate-200">
          {taglineStart},{' '}
          <br className="md:hidden" />
          {taglineEnd}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 md:gap-6">
          {job && (
            <Bubble
              href="/experience"
              id="ring-job"
              label={`Currently ${job.role} at ${job.organisation}`}
              ringText={`Currently at ${job.organisation}`}
              iconClassName="bubble-spin text-sm font-bold text-white"
            >
              {job.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={job.logo} alt="" className="w-9 h-9 object-contain" />
              ) : (
                job.organisation.split(' ').map((w) => w[0]).join('').slice(0, 2)
              )}
            </Bubble>
          )}
          <Bubble href="/contact" id="ring-contact" label="Get in touch" ringText="Get in touch" iconClassName="bubble-wave text-3xl">
            👋
          </Bubble>
        </div>
      </section>

      <div className="home-panels">
        <Slideshow slides={meSlides} href="/about" label="About me" className="aspect-[4/3]" />
        <HomeProjects />
      </div>

      <IntroSplash name={siteConfig.name} />
    </div>
  );
}
