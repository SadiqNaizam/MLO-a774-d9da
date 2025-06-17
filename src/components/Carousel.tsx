import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselProps {
  slides: React.ReactNode[]; // Array of slide content (e.g., ContentCard components)
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayDelay = 4000,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true, stopOnMouseEnter: true }),
  ]);

  console.log("Rendering Carousel with", slides.length, "slides");

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="relative w-full overflow-hidden group">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0 p-1" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  );
};

export default Carousel;