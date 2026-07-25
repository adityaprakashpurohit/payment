import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FileText, DollarSign, Calendar, Type, Receipt } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Card } from "../../components/ui/Card";
import toast from "react-hot-toast";

export const AssignPayment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [summary, setSummary] = useState({ subtotal: 0, gst: 0, total: 0 });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients');
        if (res.ok) {
          const data = await res.json();
          setClients(data);
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };
    fetchClients();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gst: 18,
    }
  });

  const amount = watch("amount") || 0;
  const gst = watch("gst") || 0;

  useEffect(() => {
    const numAmount = parseFloat(amount) || 0;
    const numGst = parseFloat(gst) || 0;
    const gstAmount = (numAmount * numGst) / 100;
    
    setSummary({
      subtotal: numAmount,
      gst: gstAmount,
      total: numAmount + gstAmount
    });
  }, [amount, gst]);

  const generateInvoiceNumber = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    setValue("invoiceNumber", `INV-${num}`);
  };

  const clientOptions = [
    { value: "", label: "Select a client..." },
    ...clients.map(c => ({ value: c.id, label: `${c.name || c.fullName} (${c.company})` }))
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const selectedClient = clients.find(c => c.id === data.clientId);
      const payload = {
        ...data,
        clientName: selectedClient ? (selectedClient.name || selectedClient.fullName) : "Unknown",
        clientEmail: selectedClient ? selectedClient.email : "",
        amount: summary.total
      };

      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        toast.success("Payment assigned successfully!");
        navigate("/admin/payments");
      } else {
        toast.error("Failed to assign payment");
      }
    } catch (error) {
      console.error("Assign payment error:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Assign Payment
        </h1>
        <p className="text-muted-foreground mt-2">Create a new invoice and assign it to a client.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-8">
            <form id="payment-form" onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-4">
                  Client Details
                </h3>
                
                <div>
                  <Select
                    options={clientOptions}
                    {...register("clientId", { required: "Please select a client" })}
                    error={errors.clientId?.message}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-4">
                  Project & Invoice
                </h3>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Input
                      icon={Type}
                      placeholder="Project Name"
                      {...register("project", { required: "Project name is required" })}
                      error={errors.project?.message}
                    />
                  </div>

                  <div className="relative">
                    <Input
                      icon={Receipt}
                      placeholder="Invoice Number"
                      {...register("invoiceNumber", { required: "Invoice number is required" })}
                      error={errors.invoiceNumber?.message}
                    />
                    <button
                      type="button"
                      onClick={generateInvoiceNumber}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-semibold rounded-lg text-accent bg-accent/10 hover:bg-accent hover:text-white transition-colors"
                    >
                      AUTO
                    </button>
                  </div>
                </div>

                <div>
                  <textarea
                    className="w-full min-h-[150px] bg-input border border-border rounded-xl px-4 py-4 text-foreground transition-all duration-200 outline-none focus:border-accent focus:ring-4 focus:ring-accent/20 placeholder:text-muted-foreground resize-y"
                    placeholder="Description..."
                    {...register("description")}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-4">
                  Payment Terms
                </h3>
                
                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <Input
                      icon={DollarSign}
                      type="number"
                      step="0.01"
                      placeholder="Amount"
                      {...register("amount", { 
                        required: "Amount is required",
                        min: { value: 1, message: "Amount must be > 0" }
                      })}
                      error={errors.amount?.message}
                    />
                  </div>

                  <div>
                    <Input
                      type="number"
                      placeholder="GST (%)"
                      {...register("gst", { 
                        min: { value: 0, message: "Cannot be negative" }
                      })}
                      error={errors.gst?.message}
                    />
                  </div>

                  <div>
                    <Input
                      icon={Calendar}
                      type="date"
                      {...register("dueDate", { required: "Due date is required" })}
                      error={errors.dueDate?.message}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </div>

        <div>
          <Card className="sticky top-32 p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6 border-b border-border pb-4">
              Summary
            </h3>
            
            <div className="space-y-4 text-base font-medium">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{summary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST ({gst || 0}%)</span>
                <span>₹{summary.gst.toFixed(2)}</span>
              </div>
              
              <div className="my-6 border-t border-border"></div>
              
              <div className="flex justify-between text-2xl font-bold text-foreground">
                <span>Total</span>
                <span>₹{summary.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8">
              <Button 
                type="submit" 
                form="payment-form" 
                className="w-full text-lg h-14" 
                isLoading={isLoading}
              >
                Assign Payment
              </Button>
            </div>
            
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Client will be notified via email.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
