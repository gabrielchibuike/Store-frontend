export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
}

const MOCK_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "10 Fashion Trends for the Modern Woman",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h3>The Rise of Sustainable Fashion</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      <blockquote>"Fashion is not something that exists in dresses only. Fashion is in the sky, in the street, fashion has to do with ideas, the way we live, what is happening." - Coco Chanel</blockquote>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    `,
    image: "/images/blog/blog-1.jpg",
    date: "22 March 2024",
    author: "Jenny Wilson",
    category: "Fashion",
    tags: ["Trends", "Women", "Style"],
  },
  {
    id: "2",
    title: "Fashion Forward: Tips, Trends, and Inspiration",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    content: "Full content placeholder...",
    image: "/images/blog/blog-2.jpg",
    date: "21 March 2024",
    author: "Jenny Wilson",
    category: "Tips",
    tags: ["Inspiration", "Style"],
  },
  {
    id: "3",
    title: "Fall Fashion Frenzy: The Ultimate Style Guide",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    content: "Full content placeholder...",
    image: "/images/blog/blog-3.jpg",
    date: "20 March 2024",
    author: "Jenny Wilson",
    category: "Guides",
    tags: ["Fall", "Guide"],
  },
  {
    id: "4",
    title: "Use Accessories to Make Your Outfit Cooler",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    content: "Full content placeholder...",
    image: "/images/blog/blog-4.jpg",
    date: "19 March 2024",
    author: "Jenny Wilson",
    category: "Accessories",
    tags: ["Accessories", "Cool"],
  },
  {
    id: "5",
    title: "Wear Layers to Stay Warm and Look Cool",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    content: "Full content placeholder...",
    image: "/images/blog/blog-5.jpg",
    date: "18 March 2024",
    author: "Jenny Wilson",
    category: "Tips",
    tags: ["Winter", "Layers"],
  },
  {
    id: "6",
    title: "Celebrities with Great Fashion Sense",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    content: "Full content placeholder...",
    image: "/images/blog/blog-6.jpg",
    date: "17 March 2024",
    author: "Jenny Wilson",
    category: "Celebrity",
    tags: ["Celebrity", "Style"],
  },
];

export async function getBlogs() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return [...MOCK_BLOGS];
}

export async function getBlogById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_BLOGS.find((blog) => blog.id === id) || null;
}

export async function getRelatedBlogs(currentId: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_BLOGS.filter((blog) => blog.id !== currentId).slice(0, 3);
}
