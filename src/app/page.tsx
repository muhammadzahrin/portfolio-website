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

/** Logo for a bubble, or the name's initials until there is one */
function BubbleLogo({ name, logo }: { name: string; logo?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (logo) return <img src={logo} alt="" className="w-9 h-9 object-contain" />;
  return <>{name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</>;
}

export default function HomePage() {
  const job = workExperiences.find((w) => w.isCurrent);
  const uni = memoriesData.find((m) => m.category === 'education');

  return (
    // Same width and top padding as the other pages
    <div className="home max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-4 flex flex-col gap-6 md:gap-8">
      {/* Title screen: my name and subtitle, with a row of bubbles like a menu: to the right on desktop, below on phones */}
      <section className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        <div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[1.1]">
          <span data-intro-target className="intro-name">
            {siteConfig.name}
          </span>
        </h1>
        <p className="mt-1 text-base sm:text-lg text-slate-300">{siteConfig.tagline}</p>
        </div>

        <div className="bubble-row mt-4 md:mt-0 flex justify-center gap-3 sm:gap-10 md:gap-6">
          {job && (
            <Bubble
              href="/experience"
              id="ring-job"
              label={`Currently ${job.role} at ${job.organisation}`}
              ringText={job.organisation}
              ringBottom={job.role}
              iconClassName="bubble-spin text-sm font-bold text-white"
            >
              <BubbleLogo name={job.organisation} logo={job.logo} />
            </Bubble>
          )}
          {uni && (
            <Bubble
              href="/about"
              id="ring-uni"
              label={`Studying ${uni.subtitle} at ${uni.title}`}
              ringText={uni.title}
              // The full name runs up both sides of the ring
              ringBottom="Diploma in IT"
              iconClassName="bubble-spin text-sm font-bold text-white"
            >
              <BubbleLogo name={uni.title} />
            </Bubble>
          )}
          <Bubble href="/contact" id="ring-contact" label="Get in touch" ringText="Get in touch" iconClassName="bubble-wave text-white">
            <HandWaveIcon />
          </Bubble>
        </div>
      </section>

      <div className="home-panels">
        <Slideshow slides={meSlides} href="/about" label="About me" className="aspect-[4/3]" />
        <HomeProjects />
      </div>

      <IntroSplash />
    </div>
  );
}
