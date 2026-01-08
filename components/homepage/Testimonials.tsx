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
    <section className="py-16 bg-[#FDF8F5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center text-center p-6">
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-6 italic">
                          "{testimonial.content}"
                        </p>
                        <div className="mt-auto">
                          <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2 flex items-center justify-center text-primary font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
