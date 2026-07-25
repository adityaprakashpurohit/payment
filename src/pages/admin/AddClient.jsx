import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User, Mail, Building, Phone, Lock } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import toast from "react-hot-toast";

export const AddClient = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // In the backend, we should use 'name' to be consistent, so we map fullName to name
      const payload = { ...data, name: data.fullName };
      
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error('Failed to save client');
      
      toast.success("Client added successfully!");
      navigate("/admin/clients");
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error('Failed to add client. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Add New Client
        </h1>
        <p className="text-muted-foreground mt-2">Create a new client profile and send them their login credentials.</p>
      </div>

      <Card className="p-8 md:p-12 shadow-soft border-none">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Input
                icon={User}
                placeholder="Full Name"
                {...register("fullName", { required: "Full name is required" })}
                error={errors.fullName?.message}
              />
            </div>

            <div>
              <Input
                icon={Building}
                placeholder="Company"
                {...register("company", { required: "Company is required" })}
                error={errors.company?.message}
              />
            </div>

            <div>
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                error={errors.email?.message}
              />
            </div>

            <div>
              <Input
                icon={Phone}
                type="tel"
                placeholder="Phone Number"
                {...register("phone")}
              />
            </div>

            <div>
              <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" }
                })}
                error={errors.password?.message}
              />
            </div>

            <div>
              <Input
                icon={Lock}
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", { 
                  required: "Please confirm password",
                  validate: value => value === password || "Passwords do not match"
                })}
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end border-t border-border pt-8 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              Reset
            </Button>
            <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto">
              Save Client
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
