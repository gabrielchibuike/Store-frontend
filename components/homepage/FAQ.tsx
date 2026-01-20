"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "You can track your order by logging into your account and visiting the 'My Orders' section. You will also receive a tracking link via email once your order ships.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unused items in their original packaging. Returns are free for all orders over $50.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary depending on the destination.",
  },
  {
    question: "How do I find my size?",
    answer:
      "Please refer to our detailed size guide available on each product page. If you are unsure, you can contact our customer support for assistance.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20 space-y-4">
          <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
            Still Have Questions?
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
            Everything you need to know about our products, shipping, and
            returns. Can't find what you're looking for? Contact our support
            team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl border bg-card transition-all duration-300 overflow-hidden",
                openIndex === index
                  ? "shadow-lg shadow-primary/5 ring-1 ring-primary/10 border-primary/10"
                  : "hover:border-primary/20"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 md:p-8 text-left transition-colors"
              >
                <span
                  className={cn(
                    "font-bold text-base md:text-xl lg:text-2xl transition-colors",
                    openIndex === index ? "text-primary" : "text-foreground"
                  )}
                >
                  {faq.question}
                </span>
                <div
                  className={cn(
                    "flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    openIndex === index
                      ? "bg-primary text-primary-foreground rotate-180"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
                </div>
              </button>
              <div
                className={cn(
                  "px-5 md:px-8 overflow-hidden transition-all duration-500 ease-in-out",
                  openIndex === index
                    ? "max-h-[500px] pb-8 opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                <div className="h-[1px] w-full bg-border mb-6" />
                <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
