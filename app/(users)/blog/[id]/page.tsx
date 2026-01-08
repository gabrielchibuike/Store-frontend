"use client";

import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import {
  getBlogById,
  getRelatedBlogs,
  BlogPost,
} from "@/lib/services/blogService";
import Link from "next/link";
import {
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";

export default function SingleBlogPage() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const blogData = await getBlogById(id);
      setBlog(blogData);
      if (blogData) {
        const related = await getRelatedBlogs(id);
        setRelatedBlogs(related);
      }
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog not found
      </div>
    );

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
              <Link href="/blog" className="hover:text-primary">
                Blog
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Blog Details</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image */}
              <div className="aspect-video bg-gray-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Blog Hero Image
                </div>
              </div>

              {/* Meta */}
              <div className="flex gap-4 text-sm">
                <span className="bg-[#F5B041] px-3 py-1 rounded font-medium text-black">
                  {blog.category}
                </span>
                <span className="bg-[#F5B041] px-3 py-1 rounded font-medium text-black">
                  {blog.category}
                </span>
                <span className="bg-[#F5B041] px-3 py-1 rounded font-medium text-black">
                  {blog.category}
                </span>
              </div>

              {/* Title & Author */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{blog.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-8 w-8 rounded-full bg-gray-300" />
                  <span>Written by {blog.author}</span>
                  <span>•</span>
                  <span>{blog.date}</span>
                </div>
              </div>

              {/* Content */}
              <div
                className="prose max-w-none prose-headings:font-bold prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Share */}
              <div className="border-t pt-8 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="font-bold mr-2">Tags:</span>
                  {blog.tags.map((tag) => (
                    <span key={tag} className="text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <span className="font-bold">Share:</span>
                  <div className="flex gap-3">
                    <Facebook className="h-5 w-5 cursor-pointer hover:text-primary" />
                    <Twitter className="h-5 w-5 cursor-pointer hover:text-primary" />
                    <Linkedin className="h-5 w-5 cursor-pointer hover:text-primary" />
                    <Instagram className="h-5 w-5 cursor-pointer hover:text-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>

          {/* Related Blogs */}
          <div className="mt-20 space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold">Latest Related Blogs</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
