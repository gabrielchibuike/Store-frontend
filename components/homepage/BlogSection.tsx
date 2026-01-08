import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "10 Fashion Trends for the Summer Season",
    excerpt:
      "Discover the hottest trends that are taking over the fashion world this summer.",
    date: "May 15, 2024",
    imageColor: "bg-[#E6E6FA]",
  },
  {
    title: "Sustainable Fashion: Tips, Trends, and Importance",
    excerpt:
      "Why sustainable fashion matters and how you can build an eco-friendly wardrobe.",
    date: "May 10, 2024",
    imageColor: "bg-[#F5E6D3]",
  },
  {
    title: "Fall Fashion Frenzy: The Ultimate Style Guide",
    excerpt:
      "Get ready for the fall season with our comprehensive style guide.",
    date: "May 05, 2024",
    imageColor: "bg-[#E0FFFF]",
  },
];

export function BlogSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">From Blog</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Latest News & Blogs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="group cursor-pointer">
              <div
                className={`h-[250px] ${post.imageColor} rounded-2xl mb-4 overflow-hidden relative`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-bold text-xl group-hover:scale-105 transition-transform duration-500">
                  Blog Image
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <Button
                variant="link"
                className="p-0 h-auto font-semibold group-hover:text-primary"
              >
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
