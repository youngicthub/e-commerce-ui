"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";
import ProductList from "@/component/ProductList";

const Homepage = () => {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    autoplay.current,
  ]);

  return (
    <div className='w-full max-w-6xl mx-auto mb-20'>
      {/* HERO SLIDER */}
      <div ref={emblaRef} className='embla overflow-hidden rounded-xl mb-10'>
        <div className='embla__container flex'>
          <div className='embla__slide relative h-[350px] sm:h-[450px] md:h-[550px] flex-[0_0_100%] min-w-full'>
            <Image
              src='https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=1742&auto=format&fit=crop'
              alt='Slide 1'
              fill
              className='object-cover'
            />
          </div>

          <div className='embla__slide relative h-[350px] sm:h-[450px] md:h-[550px] flex-[0_0_100%] min-w-full'>
            <Image
              src='https://images.unsplash.com/photo-1527264935190-1401c51b5bbc?q=80&w=1740&auto=format&fit=crop'
              alt='Slide 2'
              fill
              className='object-cover'
            />
          </div>

          <div className='embla__slide relative h-[350px] sm:h-[450px] md:h-[550px] flex-[0_0_100%] min-w-full'>
            <Image
              src='https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?q=80&w=1754&auto=format&fit=crop'
              alt='Slide 3'
              fill
              className='object-cover'
            />
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <ProductList />
    </div>
  );
};

export default Homepage;
