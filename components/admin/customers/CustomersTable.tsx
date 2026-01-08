"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Ban, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getCustomerStats } from "@/lib/services/orderService";
import { format } from "date-fns";

export function CustomersTable() {
  const {
    data: customers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: getCustomerStats,
  });

  const [customerToDeactivate, setCustomerToDeactivate] = useState<
    string | null
  >(null);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  const handleDeactivateClick = (id: string) => {
    setCustomerToDeactivate(id);
    setIsDeactivateModalOpen(true);
  };

  const confirmDeactivate = () => {
    if (customerToDeactivate) {
      // In a real app, you would call the API here:
      // await fetch(`/api/customers/${customerToDeactivate}/deactivate`, { method: 'POST' });
      setIsDeactivateModalOpen(false);
      setCustomerToDeactivate(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        Error loading customers.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers!.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="text-gray-900 font-bold">
                      {customer.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700"
                  >
                    {customer.totalOrders}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold text-gray-900">
                  ${customer.totalSpent.toFixed(2)}
                </TableCell>
                <TableCell className="text-gray-600">
                  {format(new Date(customer.lastOrderDate), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={customer.status ? "default" : "secondary"}
                    className={
                      customer.status
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {customer.status ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/customers/${customer._id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeactivateClick(customer._id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        Deactivate Customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={isDeactivateModalOpen}
        onOpenChange={setIsDeactivateModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deactivate Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to deactivate this customer? This action
              will prevent them from logging in and placing new orders.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeactivateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeactivate}>
              Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
