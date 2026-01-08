"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CustomerSupportProps {
  customerId: string;
}

// Dummy support tickets data
const tickets = [
  {
    id: "TKT-101",
    subject: "Return Request",
    createdAt: "2023-06-05",
    status: "Open",
  },
  {
    id: "TKT-102",
    subject: "Product Inquiry",
    createdAt: "2023-05-20",
    status: "Closed",
  },
];

export function CustomerSupport({ customerId }: CustomerSupportProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>{ticket.createdAt}</TableCell>
              <TableCell>
                <Badge
                  variant={ticket.status === "Open" ? "default" : "secondary"}
                  className={
                    ticket.status === "Open"
                      ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                  }
                >
                  {ticket.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
