import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Download, Mail, Printer } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Loader } from "../../components/ui/Loader";
import toast from "react-hot-toast";

export const Invoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const email = localStorage.getItem("userEmail") || "";

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`/api/payments?email=${encodeURIComponent(email)}`);
        if (res.ok) {
          const data = await res.json();
          // If id is provided in URL, find it. Otherwise pick the first one for demonstration.
          const found = id ? data.find(p => p.id === id) : data[0];
          setInvoice(found);
        }
      } catch (error) {
        console.error("Failed to fetch invoice:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (email) {
      fetchInvoice();
    } else {
      setIsLoading(false);
    }
  }, [email, id]);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      toast.success("Invoice PDF downloaded successfully!");
    }, 1500);
  };

  if (isLoading) {
    return <div className="flex justify-center p-24"><Loader className="w-8 h-8 text-accent" /></div>;
  }

  if (!invoice) {
    return (
      <div className="flex justify-center p-24">
        <p className="text-muted-foreground text-lg">Invoice not found.</p>
      </div>
    );
  }

  const subtotal = parseFloat(invoice.amount) / 1.18; // Reverse calculate assuming 18% GST
  const gst = parseFloat(invoice.amount) - subtotal;

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between border-b border-border pb-8 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Invoice {invoice.id}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="px-4" onClick={() => toast.success("Invoice sent to email")}>
            <Mail size={18} className="mr-2" /> Email
          </Button>
          <Button variant="outline" className="px-4" onClick={() => window.print()}>
            <Printer size={18} className="mr-2" /> Print
          </Button>
          <Button className="px-6" onClick={handleDownload} isLoading={isDownloading}>
            <Download size={18} className="mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="p-8 sm:p-12 shadow-md border-none" id="invoice-document">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-border pb-8 mb-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center bg-accent text-white rounded-xl shadow-soft">
                <span className="font-bold text-2xl">P</span>
              </div>
              <span className="text-2xl font-bold text-foreground">
                PayFlow Pro
              </span>
            </div>
            <div className="text-sm font-medium text-muted-foreground space-y-1">
              <p>PayFlow Pro LLC</p>
              <p>456 Startup Blvd, Floor 4, Tech City</p>
              <p>billing@payflowpro.com</p>
            </div>
          </div>
          
          <div className="md:text-right">
            <h2 className="text-4xl font-bold text-foreground mb-4">INVOICE</h2>
            <div className="text-sm font-medium text-muted-foreground space-y-1 mb-6">
              <p>NO: <span className="text-foreground">{invoice.id}</span></p>
              <p>DATE: <span className="text-foreground">{invoice.date}</span></p>
              <p>DUE: <span className="text-foreground">{invoice.dueDate || invoice.date}</span></p>
            </div>
            <Badge variant={invoice.status === 'Paid' ? 'success' : invoice.status === 'Pending' ? 'warning' : 'destructive'} className="px-4 py-1.5 text-sm">
              {invoice.status}
            </Badge>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2">Bill To</h3>
          <div className="text-sm font-medium text-muted-foreground space-y-1">
            <p className="text-lg font-bold text-foreground">{invoice.clientName}</p>
            <p>{invoice.clientEmail}</p>
          </div>
        </div>

        {/* Items */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider rounded-tl-lg rounded-bl-lg">Description</th>
                <th className="px-4 py-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider text-right rounded-tr-lg rounded-br-lg">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-6 font-medium text-foreground">{invoice.project || "Services Rendered"}</td>
                <td className="px-4 py-6 font-semibold text-foreground text-right">₹{parseFloat(invoice.amount).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end border-t border-border pt-8">
          <div className="w-full max-w-sm space-y-4 text-sm font-medium">
            <div className="flex justify-between text-muted-foreground px-4">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground px-4">
              <span>GST (18%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-foreground bg-muted/50 rounded-xl p-6 mt-6">
              <span>Total</span>
              <span>₹{parseFloat(invoice.amount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center text-sm font-medium text-muted-foreground">
          <p>Thank you for your business.</p>
          <p className="mt-1">Direct inquiries to billing@payflowpro.com</p>
        </div>
      </Card>
    </div>
  );
};
