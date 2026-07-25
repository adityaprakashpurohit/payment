import React, { useState, useEffect } from "react";
import { CreditCard, History, Calendar, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { Loader } from "../../components/ui/Loader";
import toast from "react-hot-toast";

export const ClientDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const email = localStorage.getItem("userEmail") || "";

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(`/api/payments?email=${encodeURIComponent(email)}`);
        if (res.ok) {
          const data = await res.json();
          setInvoices(data);
        }
      } catch (error) {
        console.error("Failed to fetch client invoices:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (email) {
      fetchInvoices();
    } else {
      setIsLoading(false);
    }
  }, [email]);

  const pendingInvoices = invoices.filter(inv => inv.status === "Pending");
  const paidInvoices = invoices.filter(inv => inv.status === "Paid");
  
  const outstandingBalance = pendingInvoices.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
  const totalPaid = paidInvoices.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

  const handlePayNow = (invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentModalOpen(true);
    setPaymentMethod("");
  };

  const processPayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing then update status via API (we would ideally have a PUT endpoint)
    setTimeout(async () => {
      // In a real app we'd call an API to mark as paid here.
      // For now, we'll just mock the success locally to avoid creating another endpoint for this demo.
      setInvoices(invoices.map(inv => 
        inv.id === selectedInvoice.id ? { ...inv, status: 'Paid' } : inv
      ));
      
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      toast.success(`Payment of ₹${selectedInvoice.amount} via ${paymentMethod} successful!`);
    }, 1500);
  };

  if (isLoading) {
    return <div className="flex justify-center p-24"><Loader className="w-8 h-8 text-accent" /></div>;
  }

  return (
    <div className="space-y-8 pb-24">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back
        </h1>
        <p className="text-muted-foreground mt-2">Manage your invoices and payments securely.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <Card className="flex flex-col justify-center bg-blue-50 border-blue-100 relative overflow-hidden p-8 shadow-sm">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-blue-700">Outstanding Balance</p>
              <CreditCard size={24} className="text-blue-500" />
            </div>
            <h3 className="text-4xl font-bold text-blue-900 mb-2">₹{outstandingBalance.toFixed(2)}</h3>
            <p className="text-sm font-medium text-blue-700/80">{pendingInvoices.length} pending payment{pendingInvoices.length !== 1 && 's'}</p>
          </div>
        </Card>
        
        <Card className="flex flex-col justify-center p-8 border border-border shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-muted-foreground">Total Paid</p>
            <History size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-4xl font-bold text-foreground mb-2">₹{totalPaid.toFixed(2)}</h3>
          <p className="text-sm font-medium text-muted-foreground">{paidInvoices.length} completed payment{paidInvoices.length !== 1 && 's'}</p>
        </Card>
      </div>

      <h2 className="text-xl font-bold text-foreground mt-8 mb-6 pb-2 border-b border-border">Pending Invoices</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pendingInvoices.map(invoice => (
          <Card key={invoice.id} className="flex flex-col justify-between p-6 shadow-soft hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Badge variant="warning" className="mb-3">Pending</Badge>
                  <h3 className="text-lg font-bold text-foreground mb-1">{invoice.id}</h3>
                  <p className="text-sm text-muted-foreground">{invoice.project}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-foreground">₹{parseFloat(invoice.amount).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex items-center text-sm font-medium text-muted-foreground mb-6">
                <Calendar size={16} className="mr-2" />
                Due: {invoice.dueDate}
              </div>
            </div>
            
            <Button onClick={() => handlePayNow(invoice)} className="w-full">
              Pay Now
            </Button>
          </Card>
        ))}
        {pendingInvoices.length === 0 && (
          <div className="col-span-full">
            <Card className="text-center py-16 shadow-sm bg-muted/30 border-dashed">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">All caught up!</h3>
              <p className="text-muted-foreground">You have no pending invoices.</p>
            </Card>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <Modal 
        isOpen={isPaymentModalOpen} 
        onClose={() => !isProcessing && setIsPaymentModalOpen(false)}
        title="Make Payment"
      >
        {selectedInvoice && (
          <div className="space-y-6">
            <div className="bg-muted rounded-xl p-6 flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Invoice</p>
                <p className="text-lg font-bold text-foreground">{selectedInvoice.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Amount</p>
                <p className="text-2xl font-bold text-foreground">₹{parseFloat(selectedInvoice.amount).toFixed(2)}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Credit Card", "Debit Card", "UPI", "Net Banking", "Wallet"].map((method) => (
                  <div 
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`cursor-pointer border rounded-xl p-4 text-center transition-colors ${
                      paymentMethod === method 
                        ? "border-accent bg-blue-50 text-accent font-semibold" 
                        : "border-border hover:bg-muted text-foreground"
                    }`}
                  >
                    <span className="text-sm">{method}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm font-medium text-blue-800 text-center">
              Mock Payment Gateway - No real charges will be made.
            </div>

            <div className="flex gap-4 pt-4 border-t border-border">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsPaymentModalOpen(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={processPayment}
                isLoading={isProcessing}
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
