import { Search } from "lucide-react";
import { Button } from "../ui/button";

export default function AdminHeader({ title }: { title: string }) {
  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
    </div>
  );
}
