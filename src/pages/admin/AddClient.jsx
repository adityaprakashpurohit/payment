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

  const onSubmit = (data) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      const clients = JSON.parse(localStorage.getItem('clients') || '[]');
      clients.push({ email: data.email, password: data.password });
      localStorage.setItem('clients', JSON.stringify(clients));
      
      toast.success("Client added successfully!");
      navigate("/admin/clients");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-12 pb-24">
      <div className="py-12 border-b-2 border-border mb-12">
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter text-foreground leading-[0.85]">
          ADD NEW<br/>CLIENT
        </h1>
      </div>

      <Card className="p-8 md:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Input
                icon={User}
                placeholder="FULL NAME"
                {...register("fullName", { required: "Full name is required" })}
                error={errors.fullName?.message}
              />
            </div>

            <div>
              <Input
                icon={Building}
                placeholder="COMPANY"
                {...register("company", { required: "Company is required" })}
                error={errors.company?.message}
              />
            </div>

            <div>
              <Input
                icon={Mail}
                type="email"
                placeholder="EMAIL ADDRESS"
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
                placeholder="PHONE NUMBER"
                {...register("phone")}
              />
            </div>

            <div>
              <Input
                icon={Lock}
                type="password"
                placeholder="PASSWORD"
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
                placeholder="CONFIRM PASSWORD"
                {...register("confirmPassword", { 
                  required: "Please confirm password",
                  validate: value => value === password || "Passwords do not match"
                })}
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-6 sm:flex-row sm:justify-end border-t-2 border-border pt-12">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isLoading}
              className="w-full sm:w-auto h-20 text-2xl px-12"
            >
              RESET
            </Button>
            <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto h-20 text-2xl px-12">
              SAVE CLIENT
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
