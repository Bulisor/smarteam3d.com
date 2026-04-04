'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Youtube, ExternalLink, Search, X } from 'lucide-react'

type WorkItem = {
  img: string
  youtube?: string
  external?: string
  lightbox: string
}

const works: WorkItem[] = [
  {
    img: '/img_new/more03/3_1.jpg',
    youtube: 'https://www.youtube.com/watch?v=er0GiinNM2A',
    lightbox: '/img_new/more03/3_1.jpg',
  },
  {
    img: '/img_new/more03/3_2.jpg',
    youtube: 'https://www.youtube.com/watch?v=VEeMh4-PDJU',
    lightbox: '/img_new/more03/3_2.jpg',
  },
  {
    img: '/img_new/more03/3_4.jpg',
    lightbox: '/img_new/more03/3_4.jpg',
  },
  {
    img: '/img_new/more03/4_1.jpg',
    external: 'https://brightspaces.tech/space-planning/',
    lightbox: '/img_new/more03/4_1.jpg',
  },
  {
    img: '/img_new/more03/4_3.jpg',
    lightbox: '/img_new/more03/4_3.jpg',
  },
  {
    img: '/img_new/more03/5_5.jpg',
    lightbox: '/img_new/more03/5_5.jpg',
  },
  {
    img: '/img_new/more03/0_7.jpg',
    external: '/the3dfactory/hat/index',
    lightbox: '/img_new/more03/0_7.jpg',
  },
  {
    img: '/img_new/more03/0_1.jpg',
    external: '/portfolio/car_config.html',
    lightbox: '/img_new/more03/0_1.jpg',
  },
  {
    img: '/img_new/more03/0_3.jpg',
    external: '/portfolio/photo_viewer.html',
    lightbox: '/img_new/more03/0_3.jpg',
  },
  {
    img: '/img_new/more03/0_4.jpg',
    external: '/portfolio/car_mx5/index.html',
    lightbox: '/img_new/more03/0_4.jpg',
  },
  {
    img: '/img_new/more03/0_5.jpg',
    lightbox: '/img_new/more03/0_5.jpg',
  },
  {
    img: '/img_new/more03/2_4.jpg',
    lightbox: '/img_new/more03/2_4.jpg',
  },
]

export default function Portfolio() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  return (
    <section id="portfolio" className="py-20 bg-grey">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-headings" style={{ fontFamily: 'var(--font-heading)' }}>
            Featured Works
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {works.map((w, i) => (
            <div key={i} className="relative group overflow-hidden">
              <Image
                src={w.img}
                alt={`work ${i + 1}`}
                width={400}
                height={300}
                className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center gap-4">
                {w.youtube && (
                  <a
                    href={w.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-primary"
                  >
                    <Youtube size={28} />
                  </a>
                )}
                {w.external && (
                  <a
                    href={w.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-primary"
                  >
                    <ExternalLink size={24} />
                  </a>
                )}
                <button
                  onClick={() => setLightboxSrc(w.lightbox)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-primary cursor-pointer"
                >
                  <Search size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary"
            onClick={() => setLightboxSrc(null)}
          >
            <X size={32} />
          </button>
          <Image
            src={lightboxSrc}
            alt="lightbox"
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
