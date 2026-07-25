import React, { useEffect, useState } from "react";
import { Users, CreditCard, CheckCircle, DollarSign } from "lucide-react";
import { StatsCard } from "../../components/ui/StatsCard";
import { ChartCard } from "../../components/ui/ChartCard";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Loader } from "../../components/ui/Loader";

const COLORS = ["#F59E0B", "#22C55E", "#EF4444"]; // Pending, Paid, Overdue

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [payments, setPayments] = useState([]);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, payRes, clientRes] = await Promise.all([
          fetch('/api/dashboard'),
          fetch('/api/payments'),
          fetch('/api/clients')
        ]);
        
        if (dashRes.ok) setData(await dashRes.json());
        if (payRes.ok) setPayments(await payRes.json());
        if (clientRes.ok) setClients(await clientRes.json());
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center p-24"><Loader className="w-8 h-8 text-accent" /></div>;
  }

  if (!data) return null;

  return (
    <div className="space-y-8 pb-24">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your business.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`₹${data.revenue.toLocaleString()}`}
          icon={DollarSign}
          trend="up"
          trendValue="12.5"
        />
        <StatsCard
          title="Total Clients"
          value={data.totalClients}
          icon={Users}
          trend="up"
          trendValue="4.2"
        />
        <StatsCard
          title="Pending Payments"
          value={data.pendingPayments}
          icon={CreditCard}
        />
        <StatsCard
          title="Paid this Month"
          value={data.paymentsThisMonth}
          icon={CheckCircle}
          trend="up"
          trendValue="18.2"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard title="Revenue Trend" className="lg:col-span-2 shadow-soft rounded-2xl border-none">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.revenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", border: "none", borderRadius: "12px", boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)", color: "#111827" }}
              />
              <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Payment Status" className="shadow-soft rounded-2xl border-none">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.paymentStatusChart}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                stroke="none"
                dataKey="value"
              >
                {data.paymentStatusChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ backgroundColor: "#ffffff", border: "none", borderRadius: "12px", boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)", color: "#111827" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 flex justify-center gap-4 text-sm font-medium">
            {data.paymentStatusChart.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-foreground">{entry.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Payments</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>Invoice</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {payments.slice(0, 5).map((payment) => (
                  <Tr key={payment.id}>
                    <Td className="font-medium text-foreground">{payment.id}</Td>
                    <Td className="font-medium">₹{parseFloat(payment.amount).toFixed(2)}</Td>
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
                  </Tr>
                ))}
                {payments.length === 0 && (
                  <Tr>
                    <Td colSpan={3} className="text-center text-muted-foreground py-4">No payments found.</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Clients</h3>
          </div>
          <div className="space-y-4">
            {clients.slice(0, 4).map((client) => (
              <div key={client.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent text-lg">
                    {((client.name || client.fullName) || 'U').charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{client.name || client.fullName}</p>
                    <p className="text-sm text-muted-foreground">{client.company}</p>
                  </div>
                </div>
              </div>
            ))}
            {clients.length === 0 && (
              <div className="text-center text-muted-foreground py-4">No clients found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
