"use client"

import { useEffect } from "react"
import { User, Mail, Lock, BadgeIcon as IdCard } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import Card, { CardHeader, CardBody, CardFooter } from "../components/ui/Card"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import { Link } from "react-router-dom"

const Signup = () => {
  const { registerForm, handleRegister, isLoading, error, clearError } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = registerForm

  // Clear any auth errors when component mounts
  useEffect(() => {
    clearError()
  }, [clearError])

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">Create a new account</h2>
        </CardHeader>
        <CardBody>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-100">{error}</div>
          )}
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
            <Input
              label="Full Name"
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              icon={User}
              error={errors.fullname?.message}
              {...register("fullname")}
            />

            <Input
              label="Employee ID"
              name="employeeId"
              type="text"
              placeholder="Enter your employee ID"
              icon={IdCard}
              error={errors.employeeId?.message}
              {...register("employeeId")}
            />

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
              placeholder="Create a password"
              icon={Lock}
              error={errors.password?.message}
              {...register("password")}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              icon={Lock}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <div>
              <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
                Sign up
              </Button>
            </div>
          </form>
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup

