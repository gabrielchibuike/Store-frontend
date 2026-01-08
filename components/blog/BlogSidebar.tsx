"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BlogSidebar() {
  const categories = [
    { name: "Fashion", count: 12 },
    { name: "Style", count: 8 },
    { name: "Accessories", count: 5 },
    { name: "Season", count: 3 },
  ];

  const recentPosts = [
    { title: "Fashion Trends Throughout the Year", date: "22 March 2024" },
    { title: "Recording the Latest Fashion Shows", date: "21 March 2024" },
    { title: "Crafting Your Own Fashion", date: "20 March 2024" },
  ];

  const tags = [
    "Fashion",
    "Style",
    "Trend",
    "Clothing",
    "Season",
    "Accessories",
  ];

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative">
        <Input placeholder="Search..." className="pr-10" />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Filter by Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground hover:text-primary cursor-pointer">
                {cat.name}
              </span>
              <span className="text-muted-foreground">({cat.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Recent Post</h3>
        <div className="space-y-4">
          {recentPosts.map((post, i) => (
            <div key={i} className="flex gap-4 group cursor-pointer">
              <div className="h-16 w-16 bg-muted rounded flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {post.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href="#"
              className="px-3 py-1 bg-gray-100 text-xs rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
