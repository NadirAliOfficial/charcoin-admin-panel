"use client";
import { loginSchema } from "@/schemas/auth-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import * as yup from "yup";
import { Eye, EyeSlash } from "@mynaui/icons-react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormData = yup.InferType<typeof loginSchema>;

const AdminLoginForm = () => {
  const [showPin, setShowPin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Login successful!");
      router.push("/dashboard");

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="username">Private Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter a username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pinCode">PIN Code</Label>
          <div className="relative flex  items-center">
            <Input
              id="pinCode"
              type={showPin ? "text" : "password"}
              placeholder="Enter a PIN code"
              {...register("pinCode")}
            />
            <button
              type="button"
              className="absolute right-4  focus:outline-none focus:text-primary hover:text-primary !p-0 text-lg h-auto w-auto"
              onClick={() => setShowPin(!showPin)}
            >
              {showPin ? <EyeSlash /> : <Eye />}
            </button>
          </div>
          {errors.pinCode && (
            <p className="text-sm text-red-500">{errors.pinCode.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative flex  items-center">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-4  focus:outline-none focus:text-primary hover:text-primary !p-0 text-lg h-auto w-auto"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="otp">OTP</Label>
          <div className="relative flex  items-center">
            <Input
              id="otp"
              type={showOTP ? "text" : "password"}
              placeholder="Enter your OTP"
              {...register("otp")}
            />
            <button
              type="button"
              className="absolute right-4  focus:outline-none focus:text-primary hover:text-primary !p-0 text-lg h-auto w-auto"
              onClick={() => setShowOTP(!showOTP)}
            >
              {showOTP ? <EyeSlash /> : <Eye />}
            </button>
          </div>
          {errors.otp && (
            <p className="text-sm text-red-500">{errors.otp.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          size={"lg"}
          className="w-full bg-[#40E7C4]  hover:bg-[#3AD1B1] text-black font-medium !mt-8"
        >
          {isSubmitting ? "Accessing..." : "Access"}
          {isSubmitting ? (
            <Loader className="text-primary animate-spin !w-5 !h-5" />
          ) : (
            <span className="ml-2">→</span>
          )}
        </Button>
      </form>
    </div>
  );
};

export { AdminLoginForm };
