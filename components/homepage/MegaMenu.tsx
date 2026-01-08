"use client";

import Link from "next/link";
import { MegaMenuData } from "@/lib/navigation";
import { Button } from "@/components/ui/button";

interface MegaMenuProps {
  data: MegaMenuData;
}

export function MegaMenu({ data }: MegaMenuProps) {
  return (
    <div className="absolute top-full left-0 w-full bg-background border-b shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-12 gap-8">
          {/* Categories */}
          <div className="col-span-8 grid grid-cols-3 gap-8">
            {data.sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-bold text-lg text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Promo Banner */}
          <div className="col-span-4">
            <div
              className={`relative overflow-hidden rounded-lg ${data.promo.imageColor} h-full min-h-[300px] flex items-center justify-center p-6 text-center`}
            >
              {/* Background decoration */}
              <div className="absolute right-[-20px] top-[20%] w-32 h-32 rounded-full border-2 border-dashed border-black/10 opacity-50" />

              <div className="relative z-10 space-y-4 max-w-[200px]">
                <p className="text-sm font-medium text-foreground/80">
                  — {data.promo.title}
                </p>
                <h3 className="text-2xl font-bold text-foreground">
                  {data.promo.subtitle}
                </h3>
                <Button
                  asChild
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  <Link href={data.promo.ctaLink}>{data.promo.ctaText}</Link>
                </Button>
              </div>

              {/* Placeholder for image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
