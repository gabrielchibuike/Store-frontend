"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
    <section className="py-16 bg-[#F9F9F9]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Questions? Look Here
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 text-primary" />
                ) : (
                  <Plus className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-40 pb-6 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
