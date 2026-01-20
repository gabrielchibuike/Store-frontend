"use client";

import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Fashion Blogger",
    content:
      "I absolutely love the quality of the clothes. The delivery was super fast and the packaging was beautiful!",
    rating: 5,
  },
  {
    name: "John D.",
    role: "Verified Buyer",
    content:
      "Great selection of men's wear. The fit is perfect and the material feels premium. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily R.",
    role: "Designer",
    content:
      "The accessories collection is stunning. I found exactly what I was looking for to complete my outfit.",
    rating: 4,
  },
  {
    name: "Michael B.",
    role: "Customer",
    content:
      "Customer service was very helpful when I needed to exchange a size. Smooth process!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-[#FDF8F5] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
          <p className="text-primary font-black uppercase tracking-[0.2em] text-xs md:text-sm">
            Success Stories
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Don't just take our word for it. Hear from our amazing community of
            fashion lovers worldwide.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative px-4"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full py-4">
                    <Card className="h-full border-none shadow-xl shadow-primary/5 rounded-[2rem] bg-white group hover:-translate-y-2 transition-transform duration-500">
                      <CardContent className="flex flex-col h-full p-8 md:p-10">
                        <div className="flex gap-1 mb-6">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4 transition-transform group-hover:scale-110",
                                i < testimonial.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted"
                              )}
                              style={{ transitionDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground text-sm md:text-base mb-8 italic leading-relaxed flex-1">
                          "{testimonial.content}"
                        </p>
                        <div className="flex items-center gap-4 border-t pt-6">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-lg">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-base md:text-lg">
                              {testimonial.name}
                            </h4>
                            <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-bold">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 bg-white border-primary/10 h-12 w-12 hover:bg-primary hover:text-white" />
              <CarouselNext className="-right-12 bg-white border-primary/10 h-12 w-12 hover:bg-primary hover:text-white" />
            </div>
            {/* Mobile indicator or simple margin fix? The CarouselNext/Prev usually need space. 
                I'll keep them but hidden on small screens to avoid overflow issues or move them inside. */}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
