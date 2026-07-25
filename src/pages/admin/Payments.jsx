import React, { useState } from "react";
import { Search, Download, Eye, Calendar } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { Pagination } from "../../components/ui/Pagination";
import paymentsData from "../../mock/payments.json";

export const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const statuses = ["All", "Pending", "Paid", "Overdue"];

  const filteredPayments = paymentsData.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-12 pb-24 relative h-full flex flex-col">
      <div className="py-12 border-b-2 border-border mb-12">
        <h1 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase tracking-tighter text-foreground leading-[0.85]">
          PAYMENT<br/>HISTORY
        </h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-2 border-border p-4 bg-background">
        <div className="w-full sm:max-w-xl relative">
          <Input
            icon={Search}
            placeholder="SEARCH INVOICES..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-6 py-4 text-xl font-bold uppercase tracking-tighter border-2 transition-colors ${
                statusFilter === status
                  ? "bg-foreground text-black border-foreground"
                  : "bg-transparent text-foreground border-transparent hover:border-border hover:bg-muted"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[400px]">
        <Table>
          <Thead>
            <Tr>
              <Th>Invoice & Project</Th>
              <Th>Client</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedPayments.map((payment) => (
              <Tr key={payment.id}>
                <Td>
                  <div className="font-black text-2xl uppercase tracking-tighter text-foreground">{payment.id}</div>
                  <div className="font-bold text-muted-foreground uppercase">{payment.project}</div>
                </Td>
                <Td className="font-bold uppercase tracking-tighter">{payment.clientName}</Td>
                <Td className="font-black text-3xl uppercase tracking-tighter">₹{payment.amount.toFixed(2)}</Td>
                <Td>
                  <Badge
                    variant={
                      payment.status === "Paid"
                        ? "success"
                        : payment.status === "Pending"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {payment.status}
                  </Badge>
                </Td>
                <Td>
                  <div className="flex items-center text-lg font-bold uppercase tracking-tighter text-muted-foreground">
                    <Calendar size={20} className="mr-2" />
                    {payment.date}
                  </div>
                </Td>
                <Td>
                  <div className="flex items-center gap-4">
                    <button className="p-2 border-2 border-transparent text-foreground hover:bg-muted hover:border-border transition-colors">
                      <Eye size={24} />
                    </button>
                    <button className="p-2 border-2 border-transparent text-foreground hover:bg-accent hover:border-black hover:text-black transition-colors">
                      <Download size={24} />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
            {paginatedPayments.length === 0 && (
              <Tr>
                <Td colSpan={6} className="text-center text-muted-foreground py-16 font-bold uppercase text-2xl tracking-tighter">
                  NO PAYMENTS FOUND.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>
      
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
