"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/services/blogService";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  blog: BlogPost;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="group flex flex-col gap-4">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
          {/* Placeholder for real image */}
          Blog Image
        </div>
        <div className="absolute bottom-4 right-4 bg-[#F5B041] px-3 py-1 text-xs font-semibold rounded">
          {blog.date}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
          <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {blog.excerpt}
        </p>
        <Button
          variant="link"
          className="p-0 h-auto font-semibold underline"
          asChild
        >
          <Link href={`/blog/${blog.id}`}>Read More</Link>
        </Button>
      </div>
    </div>
  );
}
