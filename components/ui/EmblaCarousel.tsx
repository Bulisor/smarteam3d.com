'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Props {
  slides: string[]
  autoplay?: boolean
  showNav?: boolean
  showDots?: boolean
}

export default function EmblaCarousel({
  slides,
  autoplay = false,
  showNav = true,
  showDots = true,
}: Props) {
  const plugins = autoplay ? [Autoplay({ delay: 3000, stopOnInteraction: false })] : []
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {slides.map((src, i) => (
            <div key={i} className="flex-none w-full relative">
              <Image
                src={src}
                alt={`slide ${i + 1}`}
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {showNav && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white rounded-full p-1 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white rounded-full p-1 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === selectedIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
