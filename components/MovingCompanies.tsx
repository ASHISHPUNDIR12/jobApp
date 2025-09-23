"use client";
import companies from "@/data/companies.json"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
export default function MovingCompanies() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full py-10"
    >
      <CarouselContent className="flex gap-5 sm:gap-20 items-center">
        {companies.map(({ name, id, path }) => (
          <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
            <img src={path} alt={name} className="h-9 sm:h-14 object-contain" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
