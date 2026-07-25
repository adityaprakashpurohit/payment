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
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      
      if (res.ok) {
        toast.success(result.message);
        // Save user email to localStorage to simulate a session
        localStorage.setItem("userEmail", data.email);
        
        if (result.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/client/dashboard');
        }
      } else {
        toast.error(result.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email address"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />
        </div>

        <div>
          <div className="relative">
            <Input
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-foreground cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <div>
            <a
              href="#"
              className="text-sm font-medium text-accent hover:text-blue-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                toast("Password reset link sent!");
              }}
            >
              Forgot password?
            </a>
          </div>
        </div>

        <Button type="submit" className="w-full mt-8" isLoading={isLoading}>
          Sign in
        </Button>
      </form>
    </div>
  );
};
