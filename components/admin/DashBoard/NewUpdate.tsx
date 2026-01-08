"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MoreVertical } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getActivityFeed } from "@/lib/services/dashboardService";
import { format } from "date-fns";
import Image from "next/image";

export function NewUpdate() {
  const { data: updates = [], isLoading } = useQuery({
    queryKey: ["dashboard-activity-feed"],
    queryFn: getActivityFeed,
  });

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">New & Update</CardTitle>
        <Select defaultValue="sort">
          <SelectTrigger className="w-[100px] h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="font-medium">
            <SelectItem value="sort">Sort by</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 relative pl-4 border-l border-border ml-2 mt-2">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : updates!.length === 0 ? (
            <div className="text-xs text-muted-foreground py-4">
              No recent activity
            </div>
          ) : (
            updates!.map((update) => (
              <div key={update.id} className="relative">
                <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary ring-2 ring-primary/20" />
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">
                      {format(new Date(update.date), "MMM dd, yyyy")}
                    </p>
                    <p className="text-sm font-medium leading-none">
                      {update.title}
                    </p>
                    {update.description && (
                      <p className="text-xs text-muted-foreground whitespace-pre-line line-clamp-2">
                        {update.description}
                      </p>
                    )}
                    {update.images && update.images.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {update.images.slice(0, 3).map((img, idx) => (
                          <div
                            key={idx}
                            className="relative w-8 h-8 bg-muted rounded-md overflow-hidden"
                          >
                            <Image
                              src={img}
                              alt="Review attachment"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
