import React, { useState } from "react";
import { Download, Calendar } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { Pagination } from "../../components/ui/Pagination";
import toast from "react-hot-toast";

const mockHistory = [
  { id: "INV-1004", project: "Consulting", amount: 500.00, date: "2023-10-01", status: "Paid" },
  { id: "INV-0992", project: "Initial Setup", amount: 1500.00, date: "2023-09-15", status: "Paid" },
  { id: "INV-0980", project: "Retainer - Aug", amount: 1000.00, date: "2023-08-01", status: "Paid" }
];

export const PaymentHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(mockHistory.length / itemsPerPage);
  const paginatedHistory = mockHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = (id) => {
    toast.success(`Receipt for ${id} downloaded successfully!`);
  };

  return (
    <div className="space-y-12 pb-24 relative h-full flex flex-col">
      <div className="py-12 border-b-2 border-border mb-12">
        <h1 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase tracking-tighter text-foreground leading-[0.85]">
          PAYMENT<br/>HISTORY
        </h1>
      </div>

      <div className="flex-1 min-h-[400px]">
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
                <Td className="font-black text-2xl uppercase tracking-tighter text-foreground">{payment.id}</Td>
                <Td className="font-bold uppercase tracking-tighter">{payment.project}</Td>
                <Td className="font-black text-3xl uppercase tracking-tighter">₹{payment.amount.toFixed(2)}</Td>
                <Td>
                  <div className="flex items-center text-lg font-bold uppercase tracking-tighter text-muted-foreground">
                    <Calendar size={20} className="mr-2" />
                    {payment.date}
                  </div>
                </Td>
                <Td>
                  <Badge variant="success">{payment.status}</Badge>
                </Td>
                <Td>
                  <Button 
                    variant="outline" 
                    className="gap-2 h-14"
                    onClick={() => handleDownload(payment.id)}
                  >
                    <Download size={24} />
                    RECEIPT
                  </Button>
                </Td>
              </Tr>
            ))}
            {paginatedHistory.length === 0 && (
              <Tr>
                <Td colSpan={6} className="text-center text-muted-foreground py-16 font-bold uppercase text-2xl tracking-tighter">
                  NO PAYMENT HISTORY FOUND.
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
