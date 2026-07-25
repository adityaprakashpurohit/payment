import React, { useState } from "react";
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { Pagination } from "../../components/ui/Pagination";
import { Loader } from "../../components/ui/Loader";
import { useNavigate } from "react-router-dom";

export const Clients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsData, setClientsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  React.useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients');
        if (res.ok) {
          const data = await res.json();
          const formattedData = data.map(c => ({
            ...c,
            name: c.name || c.fullName || 'Unknown',
            status: c.status || 'Active',
            totalDue: c.totalDue || 0
          }));
          setClientsData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClients();
  }, []);

  const filteredClients = clientsData.filter((client) =>
    (client.name && client.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <div className="flex justify-center p-24"><Loader className="w-8 h-8 text-accent" /></div>;
  }

  return (
    <div className="space-y-8 pb-24 h-full flex flex-col">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Client Roster
          </h1>
          <p className="text-muted-foreground mt-2">Manage your clients and their outstanding balances.</p>
        </div>
        <Button onClick={() => navigate("/admin/add-client")} className="w-full lg:w-auto">
          <Plus size={18} className="mr-2" />
          New Client
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card rounded-2xl p-4 shadow-soft">
        <div className="w-full sm:max-w-md relative">
          <Input
            icon={Search}
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter size={18} className="mr-2" />
          Filter
        </Button>
      </div>

      <div className="flex-1 bg-card rounded-2xl shadow-soft overflow-hidden">
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
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.email}</div>
                    </div>
                  </div>
                </Td>
                <Td className="font-medium">{client.company}</Td>
                <Td>
                  <Badge variant={client.status === "Active" ? "success" : "default"}>
                    {client.status}
                  </Badge>
                </Td>
                <Td className="font-semibold">₹{client.totalDue.toFixed(2)}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
            {paginatedClients.length === 0 && (
              <Tr>
                <Td colSpan={5} className="text-center text-muted-foreground py-16">
                  No clients found.
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
