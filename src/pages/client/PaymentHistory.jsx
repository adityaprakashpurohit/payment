import React, { useState, useEffect } from "react";
import { Download, Calendar } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { Pagination } from "../../components/ui/Pagination";
import { Loader } from "../../components/ui/Loader";
import toast from "react-hot-toast";

export const PaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const email = localStorage.getItem("userEmail") || "";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/payments?email=${encodeURIComponent(email)}`);
        if (res.ok) {
          const data = await res.json();
          setHistory(data.filter(p => p.status === "Paid"));
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (email) {
      fetchHistory();
    } else {
      setIsLoading(false);
    }
  }, [email]);

  const totalPages = Math.ceil(history.length / itemsPerPage);
  const paginatedHistory = history.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = (id) => {
    toast.success(`Receipt for ${id} downloaded successfully!`);
  };

  if (isLoading) {
    return <div className="flex justify-center p-24"><Loader className="w-8 h-8 text-accent" /></div>;
  }

  return (
    <div className="space-y-8 pb-24 relative h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Payment History
        </h1>
        <p className="text-muted-foreground mt-2">View your past transactions and download receipts.</p>
      </div>

      <div className="flex-1 bg-card rounded-2xl shadow-soft overflow-hidden">
        <Table>
          <Thead>
            <Tr>
              <Th>Invoice</Th>
              <Th>Project</Th>
              <Th>Amount</Th>
              <Th>Payment Date</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedHistory.map((payment) => (
              <Tr key={payment.id}>
                <Td className="font-semibold text-foreground">{payment.id}</Td>
                <Td className="text-muted-foreground">{payment.project}</Td>
                <Td className="font-semibold">₹{parseFloat(payment.amount).toFixed(2)}</Td>
                <Td>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    {payment.date}
                  </div>
                </Td>
                <Td>
                  <Badge variant="success">{payment.status}</Badge>
                </Td>
                <Td>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2"
                    onClick={() => handleDownload(payment.id)}
                  >
                    <Download size={16} />
                    Receipt
                  </Button>
                </Td>
              </Tr>
            ))}
            {paginatedHistory.length === 0 && (
              <Tr>
                <Td colSpan={6} className="text-center text-muted-foreground py-16">
                  No payment history found.
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
