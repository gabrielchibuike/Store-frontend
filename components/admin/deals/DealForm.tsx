"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/lib/services/productService";
import { createDeal, updateDeal } from "@/lib/services/dealService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface DealFormProps {
  isOpen: boolean;
  onClose: () => void;
  deal?: any;
}

export function DealForm({ isOpen, onClose, deal }: DealFormProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    productId: "",
    discountType: "PERCENT",
    discountValue: 0,
    startAt: "",
    endAt: "",
  });

  const { data: productsRes } = useQuery({
    queryKey: ["admin-products-minimal"],
    queryFn: () => getProducts({ limit: 100 }),
  });

  const products = productsRes?.data?.products || [];

  useEffect(() => {
    if (deal) {
      setFormData({
        productId: deal.product?._id || "",
        discountType: deal.discountType,
        discountValue: deal.discountValue,
        startAt: new Date(deal.startAt).toISOString().slice(0, 16),
        endAt: new Date(deal.endAt).toISOString().slice(0, 16),
      });
    } else {
      setFormData({
        productId: "",
        discountType: "PERCENT",
        discountValue: 0,
        startAt: new Date().toISOString().slice(0, 16),
        endAt: new Date(Date.now() + 86400000).toISOString().slice(0, 16), // +24h
      });
    }
  }, [deal, isOpen]);

  const mutation = useMutation({
    mutationFn: (data: any) =>
      deal ? updateDeal(deal._id, data) : createDeal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-deals"] });
      toast.success(deal ? "Deal updated" : "Deal created");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to save deal");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{deal ? "Edit Deal" : "Create New Deal"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Select
              value={formData.productId}
              onValueChange={(v) => setFormData({ ...formData, productId: v })}
              disabled={!!deal}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p: any) => (
                  <SelectItem key={p._id} value={p._id}>
                    {p.product_name} (${p.price})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Discount Type</Label>
              <Select
                value={formData.discountType}
                onValueChange={(v) =>
                  setFormData({ ...formData, discountType: v })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERCENT">Percent (%)</SelectItem>
                  <SelectItem value="FLAT">Flat ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={formData.discountValue}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountValue: Number(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Start Date & Time</Label>
            <Input
              type="datetime-local"
              value={formData.startAt}
              onChange={(e) =>
                setFormData({ ...formData, startAt: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>End Date & Time</Label>
            <Input
              type="datetime-local"
              value={formData.endAt}
              onChange={(e) =>
                setFormData({ ...formData, endAt: e.target.value })
              }
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save Deal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
