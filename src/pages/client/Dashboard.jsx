import React, { useState } from "react";
import { CreditCard, History, Download, Calendar } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import toast from "react-hot-toast";
import MarqueeComponent from "react-fast-marquee";
const Marquee = MarqueeComponent.default || MarqueeComponent;

// Using mock data for demonstration
const mockInvoices = [
  { id: "INV-1004", project: "Consulting", amount: 500.00, dueDate: "2023-10-10", status: "Paid" },
  { id: "INV-1008", project: "Additional Revisions", amount: 250.00, dueDate: "2023-11-05", status: "Pending" }
];

export const ClientDashboard = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const pendingInvoices = mockInvoices.filter(inv => inv.status === "Pending");
  const outstandingBalance = pendingInvoices.reduce((acc, curr) => acc + curr.amount, 0);

  const handlePayNow = (invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentModalOpen(true);
    setPaymentMethod("");
  };

  const processPayment = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      toast.success("Payment Successful! Mock only.");
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Section */}
      <div className="py-12 border-b-2 border-border mb-12">
        <h1 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase tracking-tighter text-foreground leading-[0.85]">
          WELCOME<br/>BACK, BOB
        </h1>
      </div>

      {/* Stats Marquee */}
      <div className="w-full bg-[#4ADE80] border-y-2 border-border py-4 mb-12 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <Marquee speed={80} gradient={false}>
          <div className="flex items-center gap-16 px-16">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black uppercase text-black">OUTSTANDING BALANCE:</span>
              <span className="text-5xl font-black uppercase text-black">₹{outstandingBalance.toFixed(2)}</span>
            </div>
            <div className="text-black font-black text-4xl">•</div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black uppercase text-black">TOTAL PAID:</span>
              <span className="text-5xl font-black uppercase text-black">₹500.00</span>
            </div>
            <div className="text-black font-black text-4xl">•</div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black uppercase text-black">PENDING INVOICES:</span>
              <span className="text-5xl font-black uppercase text-black">{pendingInvoices.length}</span>
            </div>
            <div className="text-black font-black text-4xl">•</div>
          </div>
        </Marquee>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2 border-2 border-border mb-12">
        <Card className="border-none flex flex-col justify-center bg-accent text-black group relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between opacity-80 mb-4">
              <p className="font-bold uppercase tracking-widest text-black">Outstanding Balance</p>
              <CreditCard size={32} className="text-black" />
            </div>
            <h3 className="text-6xl font-black uppercase tracking-tighter text-black">₹{outstandingBalance.toFixed(2)}</h3>
            <p className="mt-4 text-xl font-bold uppercase tracking-tighter text-black/70">{pendingInvoices.length} pending payments</p>
          </div>
          {/* Decorative Massive Number */}
          <div className="absolute -right-8 -bottom-16 text-[10rem] font-black text-black opacity-10 select-none pointer-events-none group-hover:scale-110 transition-transform duration-300">
            {pendingInvoices.length}
          </div>
        </Card>
        
        <Card className="border-none flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold uppercase tracking-widest text-muted-foreground">Total Paid</p>
            <History size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-6xl font-black uppercase tracking-tighter text-foreground">₹500.00</h3>
        </Card>
      </div>

      <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground mt-12 mb-8 pb-4 border-b-2 border-border">OUTSTANDING INVOICES</h2>
      
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {pendingInvoices.map(invoice => (
          <Card key={invoice.id} hoverable className="flex flex-col justify-between p-8">
            <div>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <Badge variant="warning" className="mb-4">Pending</Badge>
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground mb-2">{invoice.id}</h3>
                  <p className="text-lg font-bold uppercase tracking-tighter text-muted-foreground">{invoice.project}</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black uppercase tracking-tighter text-foreground">₹{invoice.amount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex items-center text-lg font-bold uppercase tracking-tighter text-muted-foreground mb-8 border-t-2 border-border pt-4">
                <Calendar size={20} className="mr-4" />
                DUE: {invoice.dueDate}
              </div>
            </div>
            
            <Button onClick={() => handlePayNow(invoice)} className="w-full h-20 text-2xl">
              PAY NOW
            </Button>
          </Card>
        ))}
        {pendingInvoices.length === 0 && (
          <div className="col-span-full">
            <Card className="text-center py-24 border-dashed">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-[#4ADE80] text-black mb-8 border-2 border-border">
                <CreditCard size={48} />
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter text-foreground mb-4">ALL CAUGHT UP!</h3>
              <p className="mt-4 text-xl font-bold uppercase tracking-tighter text-muted-foreground">NO PENDING INVOICES.</p>
            </Card>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <Modal 
        isOpen={isPaymentModalOpen} 
        onClose={() => !isProcessing && setIsPaymentModalOpen(false)}
        title="MAKE PAYMENT"
      >
        {selectedInvoice && (
          <div className="space-y-8">
            <div className="bg-muted border-2 border-border p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">INVOICE</p>
                <p className="text-2xl font-black uppercase tracking-tighter text-foreground">{selectedInvoice.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">AMOUNT</p>
                <p className="text-4xl font-black uppercase tracking-tighter text-foreground">₹{selectedInvoice.amount.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <label className="block text-xl font-bold uppercase tracking-tighter text-foreground mb-4">
                PAYMENT METHOD
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["Credit Card", "Debit Card", "UPI", "Net Banking", "Wallet"].map((method) => (
                  <div 
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`cursor-pointer border-2 p-4 text-center transition-colors ${
                      paymentMethod === method 
                        ? "border-black bg-accent text-black" 
                        : "border-border hover:bg-muted text-foreground"
                    }`}
                  >
                    <span className="text-lg font-bold uppercase tracking-tighter">{method}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted border-2 border-border p-4 text-xl font-bold uppercase tracking-tighter text-foreground text-center">
              MOCK PAYMENT GATEWAY
            </div>

            <div className="flex gap-4 mt-12 pt-8 border-t-2 border-border">
              <Button 
                variant="outline" 
                className="flex-1 h-20 text-2xl"
                onClick={() => setIsPaymentModalOpen(false)}
                disabled={isProcessing}
              >
                CANCEL
              </Button>
              <Button 
                className="flex-1 h-20 text-2xl"
                onClick={processPayment}
                isLoading={isProcessing}
              >
                PROCEED
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
