"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDeals,
  deleteDeal,
  updateDeal,
} from "@/lib/services/dealService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Pause, Play, Clock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export function DealList({ onEdit }: { onEdit: (deal: any) => void }) {
  const queryClient = useQueryClient();
  const { data: response, isLoading } = useQuery({
    queryKey: ["admin-deals"],
    queryFn: getAllDeals,
  });

  const deals = response?.data || [];

  const deleteMutation = useMutation({
    mutationFn: deleteDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-deals"] });
      toast.success("Deal deleted successfully");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateDeal(id, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-deals"] });
      toast.success("Deal status updated");
    },
  });

  const getStatus = (deal: any) => {
    const now = new Date();
    const startAt = new Date(deal.startAt);
    const endAt = new Date(deal.endAt);

    if (!deal.isActive) return <Badge variant="secondary">Paused</Badge>;
    if (now < startAt) return <Badge variant="outline">Upcoming</Badge>;
    if (now > endAt) return <Badge variant="destructive">Expired</Badge>;
    return <Badge className="bg-green-500 hover:bg-green-600">Live</Badge>;
  };

  if (isLoading) return <div className="p-8 text-center">Loading deals...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deals.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center h-24 text-muted-foreground"
            >
              No deals found. Create your first deal to get started.
            </TableCell>
          </TableRow>
        ) : (
          deals.map((deal) => (
            <TableRow key={deal._id}>
              <TableCell className="font-medium">
                {deal.product?.product_name || "Unknown Product"}
              </TableCell>
              <TableCell>
                {deal.discountType === "PERCENT"
                  ? `${deal.discountValue}%`
                  : `$${deal.discountValue}`}
              </TableCell>
              <TableCell>
                {format(new Date(deal.startAt), "MMM d, HH:mm")}
              </TableCell>
              <TableCell>
                {format(new Date(deal.endAt), "MMM d, HH:mm")}
              </TableCell>
              <TableCell>{getStatus(deal)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    toggleMutation.mutate({
                      id: deal._id,
                      isActive: !deal.isActive,
                    })
                  }
                >
                  {deal.isActive ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(deal)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive/80"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this deal?")) {
                      deleteMutation.mutate(deal._id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
