import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FileText, DollarSign, Calendar, Type, Receipt } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Card } from "../../components/ui/Card";
import toast from "react-hot-toast";
import clientsData from "../../mock/clients.json";

export const AssignPayment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState({ subtotal: 0, gst: 0, total: 0 });

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
    { value: "", label: "SELECT A CLIENT..." },
    ...clientsData.map(c => ({ value: c.id, label: `${c.name.toUpperCase()} (${c.company.toUpperCase()})` }))
  ];

  const onSubmit = (data) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Payment assigned successfully!");
      navigate("/admin/payments");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-12 pb-24">
      <div className="py-12 border-b-2 border-border mb-12">
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter text-foreground leading-[0.85]">
          ASSIGN<br/>PAYMENT
        </h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-8 md:p-12">
            <form id="payment-form" onSubmit={handleSubmit(onSubmit)} className="space-y-16">
              <div className="space-y-8">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground border-b-2 border-border pb-4">
                  CLIENT DETAILS
                </h3>
                
                <div>
                  <Select
                    options={clientOptions}
                    {...register("clientId", { required: "Please select a client" })}
                    error={errors.clientId?.message}
                  />
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground border-b-2 border-border pb-4">
                  PROJECT & INVOICE
                </h3>
                
                <div className="grid gap-12 sm:grid-cols-2">
                  <div>
                    <Input
                      icon={Type}
                      placeholder="PROJECT NAME"
                      {...register("projectName", { required: "Project name is required" })}
                      error={errors.projectName?.message}
                    />
                  </div>

                  <div className="relative">
                    <Input
                      icon={Receipt}
                      placeholder="INVOICE NUMBER"
                      {...register("invoiceNumber", { required: "Invoice number is required" })}
                      error={errors.invoiceNumber?.message}
                    />
                    <button
                      type="button"
                      onClick={generateInvoiceNumber}
                      className="absolute right-0 top-0 h-24 px-4 text-xl font-bold uppercase tracking-tighter text-muted-foreground hover:text-foreground transition-colors"
                    >
                      AUTO
                    </button>
                  </div>
                </div>

                <div>
                  <textarea
                    className="w-full min-h-[200px] border-0 border-b-2 border-border bg-transparent px-0 py-6 text-2xl font-bold uppercase tracking-tighter text-foreground transition-colors focus:border-accent focus:outline-none placeholder:text-muted resize-y"
                    placeholder="DESCRIPTION..."
                    {...register("description")}
                  />
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground border-b-2 border-border pb-4">
                  PAYMENT TERMS
                </h3>
                
                <div className="grid gap-12 sm:grid-cols-3">
                  <div>
                    <Input
                      icon={DollarSign}
                      type="number"
                      step="0.01"
                      placeholder="AMOUNT"
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
          <Card className="sticky top-32 p-8 lg:p-12">
            <h3 className="text-4xl font-black uppercase tracking-tighter text-foreground mb-8 border-b-2 border-border pb-4">
              SUMMARY
            </h3>
            
            <div className="space-y-6 text-xl font-bold uppercase tracking-tighter">
              <div className="flex justify-between text-muted-foreground">
                <span>SUBTOTAL</span>
                <span>₹{summary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST ({gst || 0}%)</span>
                <span>₹{summary.gst.toFixed(2)}</span>
              </div>
              
              <div className="my-8 border-t-2 border-border"></div>
              
              <div className="flex justify-between text-4xl font-black text-foreground">
                <span>TOTAL</span>
                <span>₹{summary.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-12">
              <Button 
                type="submit" 
                form="payment-form" 
                className="w-full h-24 text-3xl" 
                isLoading={isLoading}
              >
                ASSIGN
              </Button>
            </div>
            
            <p className="mt-8 text-center text-lg font-bold uppercase tracking-tighter text-muted-foreground">
              CLIENT WILL BE NOTIFIED VIA EMAIL.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
