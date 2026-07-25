import React, { useState, useEffect } from "react";
import { Search, Download, Eye, Calendar } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { Pagination } from "../../components/ui/Pagination";
import { Loader } from "../../components/ui/Loader";

export const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const statuses = ["All", "Pending", "Paid", "Overdue"];

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch('/api/payments');
        if (res.ok) {
          const data = await res.json();
          setPayments(data);
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.clientName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.project || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <div className="flex justify-center p-24"><Loader className="w-8 h-8 text-accent" /></div>;
  }

  return (
    <div className="space-y-8 pb-24 relative h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Payment History
        </h1>
        <p className="text-muted-foreground mt-2">View and manage all your client payments.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card rounded-2xl p-4 shadow-soft">
        <div className="w-full sm:max-w-md relative">
          <Input
            icon={Search}
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                statusFilter === status
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground hover:bg-muted"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-card rounded-2xl shadow-soft overflow-hidden">
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
                  <div className="font-semibold text-foreground">{payment.id}</div>
                  <div className="text-sm text-muted-foreground">{payment.project}</div>
                </Td>
                <Td className="font-medium">{payment.clientName}</Td>
                <Td className="font-semibold">₹{parseFloat(payment.amount).toFixed(2)}</Td>
                <Td>
                  <Badge
                    variant={
                      payment.status === "Paid"
                        ? "success"
                        : payment.status === "Pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {payment.status}
                  </Badge>
                </Td>
                <Td>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    {payment.date}
                  </div>
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                      <Eye size={20} />
                    </button>
                    <button className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-white transition-colors">
                      <Download size={20} />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
            {paginatedPayments.length === 0 && (
              <Tr>
                <Td colSpan={6} className="text-center text-muted-foreground py-16">
                  No payments found matching your criteria.
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
