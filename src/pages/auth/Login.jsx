import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Logged in successfully as ${role}`);
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/client/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div>
          <Input
            icon={Mail}
            type="email"
            placeholder="EMAIL ADDRESS"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />
        </div>

        <div>
          <div className="relative">
            <Input
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={32} /> : <Eye size={32} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-6 w-6 appearance-none border-2 border-border bg-transparent checked:bg-accent checked:border-accent cursor-pointer transition-colors"
            />
            <label
              htmlFor="remember-me"
              className="ml-4 block text-lg font-bold uppercase tracking-tighter text-foreground cursor-pointer"
            >
              REMEMBER ME
            </label>
          </div>
          <div>
            <a
              href="#"
              className="text-lg font-bold uppercase tracking-tighter text-muted-foreground hover:text-accent transition-colors"
              onClick={(e) => {
                e.preventDefault();
                toast("Password reset link sent!");
              }}
            >
              FORGOT PASSWORD?
            </a>
          </div>
        </div>

        <Button type="submit" className="w-full h-20 text-2xl mt-12" isLoading={isLoading}>
          SIGN IN
        </Button>
      </form>
    </div>
  );
};
