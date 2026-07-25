import React, { useState } from "react";
import { Download, CheckCircle, Mail, Printer } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import toast from "react-hot-toast";

export const Invoice = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const mockInvoice = {
    id: "INV-1004",
    date: "OCT 01, 2023",
    dueDate: "OCT 10, 2023",
    status: "PAID",
    project: "CONSULTING SERVICES",
    client: {
      name: "BOB SMITH",
      company: "GLOBEX INC",
      email: "BOB@GLOBEX.COM",
      address: "123 BUSINESS AVE, SUITE 100, TECH CITY, TC 90210"
    },
    company: {
      name: "PAYFLOW PRO LLC",
      email: "BILLING@PAYFLOWPRO.COM",
      address: "456 STARTUP BLVD, FLOOR 4, INNOVATION HUB, IH 10001"
    },
    items: [
      { description: "STRATEGY CONSULTING (10 HOURS)", amount: 1500.00 },
      { description: "UI/UX REVIEW", amount: 500.00 },
    ],
    subtotal: 2000.00,
    gstPercent: 10,
    gst: 200.00,
    total: 2200.00
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      toast.success("Invoice PDF downloaded successfully!");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-12 pb-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-end justify-between border-b-2 border-border pb-12 mb-12">
        <div>
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter text-foreground leading-[0.85]">
            INVOICE<br/>{mockInvoice.id}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-16 px-6" onClick={() => toast.success("Invoice sent to email")}>
            <Mail size={24} />
          </Button>
          <Button variant="outline" className="h-16 px-6" onClick={() => window.print()}>
            <Printer size={24} />
          </Button>
          <Button className="h-16 px-8 text-xl" onClick={handleDownload} isLoading={isDownloading}>
            <Download size={24} className="mr-2" />
            PDF
          </Button>
        </div>
      </div>

      <Card className="p-8 sm:p-12 border-4 border-foreground" id="invoice-document">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b-4 border-foreground pb-12 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-16 w-16 items-center justify-center bg-foreground text-black">
                <span className="font-black text-4xl">P</span>
              </div>
              <span className="text-4xl font-black uppercase tracking-tighter text-foreground">
                PAYFLOW PRO
              </span>
            </div>
            <div className="text-lg font-bold uppercase tracking-tighter text-muted-foreground space-y-2">
              <p>{mockInvoice.company.name}</p>
              <p>{mockInvoice.company.address}</p>
              <p>{mockInvoice.company.email}</p>
            </div>
          </div>
          
          <div className="md:text-right">
            <h2 className="text-6xl font-black uppercase tracking-tighter text-muted mb-4">INVOICE</h2>
            <div className="text-xl font-bold uppercase tracking-tighter text-muted-foreground space-y-2 mb-8">
              <p>NO: <span className="text-foreground">{mockInvoice.id}</span></p>
              <p>DATE: <span className="text-foreground">{mockInvoice.date}</span></p>
              <p>DUE: <span className="text-foreground">{mockInvoice.dueDate}</span></p>
            </div>
            <Badge variant="success" className="text-2xl px-6 py-2 border-2 border-black">
              {mockInvoice.status}
            </Badge>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-12">
          <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground border-b-2 border-border pb-4 mb-4">BILL TO</h3>
          <div className="text-lg font-bold uppercase tracking-tighter text-muted-foreground space-y-2">
            <p className="text-3xl font-black text-foreground">{mockInvoice.client.name}</p>
            <p>{mockInvoice.client.company}</p>
            <p>{mockInvoice.client.address}</p>
            <p>{mockInvoice.client.email}</p>
          </div>
        </div>

        {/* Items */}
        <div className="mb-12 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-y-4 border-foreground bg-muted">
              <tr>
                <th className="px-6 py-6 font-black text-2xl uppercase tracking-tighter text-foreground">DESCRIPTION</th>
                <th className="px-6 py-6 font-black text-2xl uppercase tracking-tighter text-foreground text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-border">
              {mockInvoice.items.map((item, index) => (
                <tr key={index} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-8 font-bold text-xl uppercase tracking-tighter text-foreground">{item.description}</td>
                  <td className="px-6 py-8 font-black text-2xl text-foreground text-right">₹{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end border-t-4 border-foreground pt-12">
          <div className="w-full max-w-lg space-y-6 text-xl font-bold uppercase tracking-tighter">
            <div className="flex justify-between text-muted-foreground px-6">
              <span>SUBTOTAL</span>
              <span>₹{mockInvoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground px-6">
              <span>GST ({mockInvoice.gstPercent}%)</span>
              <span>₹{mockInvoice.gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-4xl font-black text-black bg-accent border-4 border-black p-8 mt-8">
              <span>TOTAL</span>
              <span>₹{mockInvoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t-2 border-border text-center text-xl font-bold uppercase tracking-tighter text-muted-foreground">
          <p>THANK YOU FOR YOUR BUSINESS.</p>
          <p className="mt-2">DIRECT INQUIRIES TO {mockInvoice.company.email}</p>
        </div>
      </Card>
    </div>
  );
};
