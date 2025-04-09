"use client";

import { useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Card, { CardHeader, CardBody, CardFooter } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { loginForm, handleLogin, isLoading, error, clearError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = loginForm;

  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  // Clear any auth errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Handle form submission with API integration
  const handleApiLogin = async (data) => {
    try {
      const response = await handleLogin(data); // ✅ this updates Zustand
      // console.log("dashboard navigate");
      navigate("/dashboard");
    } catch (err) {
      setLoginError(err.response?.data?.message || "Something went wrong");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md pt-4">
        <div className="flex justify-center text-red-600 items-center gap-2">
          <p className="text-lg font-semibold font-mono">Lab Recipe Management</p>
          <img src="/favicon.webp" alt="Logo" className="w-8 h-8"/>
        </div>
        <CardHeader>
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </CardHeader>
        <CardBody>
          {loginError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-100">
              {loginError}
            </div>
          )}
          <form onSubmit={handleSubmit(handleApiLogin)} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              icon={Mail}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              icon={Lock}
              error={errors.password?.message}
              {...register("password")}
            />

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </div>
          </form>
        </CardBody>
        {/* <CardFooter className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Sign up
            </Link>
          </p>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default Login;
