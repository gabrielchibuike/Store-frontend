import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    title: "10 Fashion Trends for the Summer Season",
    excerpt:
      "Discover the hottest trends that are taking over the fashion world this summer.",
    date: "May 15, 2024",
    imageColor: "bg-[#E6E6FA]",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Sustainable Fashion: Tips, Trends, and Importance",
    excerpt:
      "Why sustainable fashion matters and how you can build an eco-friendly wardrobe.",
    date: "May 10, 2024",
    imageColor: "bg-[#F5E6D3]",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Fall Fashion Frenzy: The Ultimate Style Guide",
    excerpt:
      "Get ready for the fall season with our comprehensive style guide.",
    date: "May 05, 2024",
    imageColor: "bg-[#E0FFFF]",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
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
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
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
