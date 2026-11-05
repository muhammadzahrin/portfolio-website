import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { workExperiences } from '@/data/experience';
import { memoriesData } from '@/data/memories';
import { HandWaveIcon } from '@/components/ui/Icons';
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

  return (
    // Same width and top padding as the other pages
    <div className="home max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-4 flex flex-col gap-6 md:gap-10">
      {/* Title screen: my name in the middle with a splash line, a bubble either side
          (at the edges on phones, beside the name on desktop) */}
      <section className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 md:gap-x-20">
        <div className="justify-self-start md:justify-self-end">
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
        </div>

        <div className="relative">
          <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[1.1]">
            <span data-intro-target className="intro-name">
              {siteConfig.name}
            </span>
          </h1>
          <p className="splash">{siteConfig.tagline}</p>
        </div>

        <div className="justify-self-end md:justify-self-start">
          <Bubble href="/contact" id="ring-contact" label="Get in touch" ringText="Get in touch" iconClassName="bubble-wave text-white">
            <HandWaveIcon />
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
