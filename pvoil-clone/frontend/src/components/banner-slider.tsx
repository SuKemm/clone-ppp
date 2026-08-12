"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const banners = [
  { title: 'Xăng E1095', href: '#', image: '/images/pvoil/image-fallback.svg' },
  { title: 'Banner poster 1', href: '/pvoil-4u', image: '/images/pvoil/image-fallback.svg' },
  { title: 'Banner poster 2', href: '/pvoil-4u', image: '/images/pvoil/image-fallback.svg' },
  { title: 'Banner', href: '#', image: '/images/pvoil/image-fallback.svg' },
  { title: 'Banner 2', href: '#', image: '/images/pvoil/image-fallback.svg' },
  { title: 'Banner 3', href: '#', image: '/images/pvoil/image-fallback.svg' },
  { title: 'Banner 4', href: '#', image: '/images/pvoil/image-fallback.svg' },
  { title: 'PVOIL 4U', href: '/pvoil-4u', image: '/images/pvoil/image-fallback.svg' },
  { title: 'PVOIL 4U', href: '/pvoil-4u', image: '/images/pvoil/image-fallback.svg' },
  { title: 'Banner 7', href: '#', image: '/images/pvoil/image-fallback.svg' },
  { title: 'Banner 8', href: '#', image: '/images/pvoil/image-fallback.svg' },
  { title: 'Banner 9', href: '#', image: '/images/pvoil/image-fallback.svg' },
  { title: 'Banner 10', href: '#', image: '/images/pvoil/image-fallback.svg' },
];

export function BannerSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  const activeBanner = banners[activeIndex];

  return (
    <section className="home-banner banner-slider bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 lg:py-4">
        <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
          <Link href={activeBanner.href} className="group block h-full">
            <div className="relative">
              <img
                src={activeBanner.image}
                alt={activeBanner.title}
                className="h-[340px] w-full object-cover transition duration-500 group-hover:scale-[1.01] sm:h-[420px] lg:h-[560px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-5 py-4 text-white sm:px-8">
                <p className="text-sm font-medium">{activeBanner.title}</p>
              </div>
            </div>
          </Link>

          <div className="flex items-center justify-between gap-4 border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-wrap gap-2">
              {banners.map((banner, index) => (
                <button
                  key={`${banner.title}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition ${index === activeIndex ? 'w-10 bg-[#ef3d32]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                  aria-label={`Chuyển tới banner ${index + 1}`}
                />
              ))}
            </div>
            <div className="text-sm text-slate-500">
              {activeIndex + 1} / {banners.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
