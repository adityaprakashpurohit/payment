import React, { useEffect, useState } from "react";
import { Users, CreditCard, CheckCircle, DollarSign } from "lucide-react";
import { StatsCard } from "../../components/ui/StatsCard";
import { ChartCard } from "../../components/ui/ChartCard";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import MarqueeComponent from "react-fast-marquee";
const Marquee = MarqueeComponent.default || MarqueeComponent;
import dashboardData from "../../mock/dashboard.json";
import paymentsData from "../../mock/payments.json";
import clientsData from "../../mock/clients.json";

const COLORS = ["#DFE104", "#4ADE80", "#EF4444"]; // Accent, Success, Danger

export const AdminDashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Section */}
      <div className="py-12 border-b-2 border-border mb-12">
        <h1 className="text-[clamp(3rem,8vw,10rem)] font-black uppercase tracking-tighter text-foreground leading-[0.85]">
          DASHBOARD<br/>OVERVIEW
        </h1>
      </div>

      {/* Stats Marquee */}
      <div className="w-full bg-accent border-y-2 border-border py-4 mb-12 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <Marquee speed={80} gradient={false}>
          <div className="flex items-center gap-16 px-16">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black uppercase text-black">TOTAL REVENUE:</span>
              <span className="text-5xl font-black uppercase text-black">₹{dashboardData.revenue.toLocaleString()}</span>
            </div>
            <div className="text-black font-black text-4xl">•</div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black uppercase text-black">TOTAL CLIENTS:</span>
              <span className="text-5xl font-black uppercase text-black">{dashboardData.totalClients}</span>
            </div>
            <div className="text-black font-black text-4xl">•</div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black uppercase text-black">PENDING PAYMENTS:</span>
              <span className="text-5xl font-black uppercase text-black">{dashboardData.pendingPayments}</span>
            </div>
            <div className="text-black font-black text-4xl">•</div>
          </div>
        </Marquee>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4 border-2 border-border mb-12">
        <StatsCard
          title="Revenue"
          value={`₹${dashboardData.revenue.toLocaleString()}`}
          icon={DollarSign}
          trend="up"
          trendValue="12.5"
          className="border-none"
        />
        <StatsCard
          title="Clients"
          value={dashboardData.totalClients}
          icon={Users}
          trend="up"
          trendValue="4.2"
          className="border-none"
        />
        <StatsCard
          title="Pending"
          value={dashboardData.pendingPayments}
          icon={CreditCard}
          className="border-none"
        />
        <StatsCard
          title="Paid (Month)"
          value={dashboardData.paymentsThisMonth}
          icon={CheckCircle}
          trend="up"
          trendValue="18.2"
          className="border-none"
        />
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <ChartCard title="Revenue Trend" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dashboardData.revenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DFE104" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#DFE104" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3F3F46" opacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#A1A1AA", fontSize: 14, fontWeight: "bold" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#A1A1AA", fontSize: 14, fontWeight: "bold" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#09090B", border: "2px solid #DFE104", borderRadius: "0", color: "#FAFAFA", fontWeight: "bold", textTransform: "uppercase" }}
              />
              <Area type="monotone" dataKey="total" stroke="#DFE104" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Payment Status">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dashboardData.paymentStatusChart}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={0}
                stroke="none"
                dataKey="value"
              >
                {dashboardData.paymentStatusChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ backgroundColor: "#09090B", border: "2px solid #DFE104", borderRadius: "0", color: "#FAFAFA", fontWeight: "bold", textTransform: "uppercase" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-8 flex justify-center gap-6">
            {dashboardData.paymentStatusChart.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="h-4 w-4" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-lg font-bold uppercase tracking-tighter text-foreground">{entry.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 mt-12">
        <div className="border-2 border-border bg-background p-8 lg:p-12">
          <div className="mb-8 flex items-center justify-between border-b-2 border-border pb-4">
            <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground">RECENT PAYMENTS</h3>
          </div>
          <Table>
            <Thead>
              <Tr>
                <Th>Invoice</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paymentsData.slice(0, 5).map((payment) => (
                <Tr key={payment.id}>
                  <Td className="font-bold">{payment.id}</Td>
                  <Td className="font-bold">₹{payment.amount.toFixed(2)}</Td>
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
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>

        <div className="border-2 border-border bg-background p-8 lg:p-12">
          <div className="mb-8 flex items-center justify-between border-b-2 border-border pb-4">
            <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground">RECENT CLIENTS</h3>
          </div>
          <div className="space-y-6">
            {clientsData.slice(0, 4).map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 border-2 border-transparent hover:border-border transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-muted flex items-center justify-center font-black text-2xl uppercase border-2 border-border group-hover:bg-accent group-hover:text-black transition-colors">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-2xl font-bold uppercase tracking-tighter text-foreground group-hover:text-accent transition-colors">{client.name}</p>
                    <p className="text-lg font-bold uppercase tracking-tighter text-muted-foreground">{client.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black uppercase tracking-tighter text-foreground">₹{client.totalDue.toFixed(2)}</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">DUE</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
