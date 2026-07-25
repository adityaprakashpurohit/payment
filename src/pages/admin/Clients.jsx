import React, { useState } from "react";
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { Pagination } from "../../components/ui/Pagination";
import { useNavigate } from "react-router-dom";
import clientsData from "../../mock/clients.json";

export const Clients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredClients = clientsData.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Section */}
      <div className="py-12 border-b-2 border-border mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase tracking-tighter text-foreground leading-[0.85]">
            CLIENT<br/>ROSTER
          </h1>
        </div>
        <Button onClick={() => navigate("/admin/add-client")} className="h-20 text-2xl w-full lg:w-auto px-12">
          NEW CLIENT
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-2 border-border p-4 bg-background">
        <div className="w-full sm:max-w-xl relative">
          <Input
            icon={Search}
            placeholder="SEARCH CLIENTS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-24 px-12 text-2xl w-full sm:w-auto">
          FILTER
        </Button>
      </div>

      <div className="flex-1 min-h-[400px]">
        <Table>
          <Thead>
            <Tr>
              <Th>Client</Th>
              <Th>Company</Th>
              <Th>Status</Th>
              <Th>Total Due</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedClients.map((client) => (
              <Tr key={client.id}>
                <Td>
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 bg-muted flex items-center justify-center font-black text-2xl uppercase border-2 border-border group-hover:bg-accent group-hover:text-black transition-colors">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-black text-2xl uppercase tracking-tighter">{client.name}</div>
                      <div className="font-bold text-muted-foreground uppercase">{client.email}</div>
                    </div>
                  </div>
                </Td>
                <Td className="font-bold uppercase tracking-tighter">{client.company}</Td>
                <Td>
                  <Badge variant={client.status === "Active" ? "success" : "default"}>
                    {client.status}
                  </Badge>
                </Td>
                <Td className="font-black text-3xl uppercase tracking-tighter">₹{client.totalDue.toFixed(2)}</Td>
                <Td>
                  <div className="flex items-center gap-4">
                    <button className="p-2 border-2 border-transparent text-foreground hover:bg-muted hover:border-border transition-colors">
                      <Eye size={24} />
                    </button>
                    <button className="p-2 border-2 border-transparent text-foreground hover:bg-muted hover:border-border transition-colors">
                      <Edit size={24} />
                    </button>
                    <button className="p-2 border-2 border-transparent text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-colors">
                      <Trash2 size={24} />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
            {paginatedClients.length === 0 && (
              <Tr>
                <Td colSpan={5} className="text-center text-muted-foreground py-16 font-bold uppercase text-2xl tracking-tighter">
                  NO CLIENTS FOUND.
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
