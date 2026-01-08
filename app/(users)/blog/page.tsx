"use client";

import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogs, BlogPost } from "@/lib/services/blogService";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await getBlogs();
      setBlogs(data);
      setLoading(false);
    };
    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">Our Blog</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Blog</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {loading ? (
            <div className="text-center py-12">Loading blogs...</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  &lt;
                </Button>
                <Button className="bg-[#F5B041] text-black hover:bg-[#D49838]">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <span className="flex items-center px-2">...</span>
                <Button variant="outline">10</Button>
                <Button variant="outline" size="icon">
                  &gt;
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
