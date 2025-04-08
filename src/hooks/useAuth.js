"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import toast from "react-hot-toast"
import { useAuthStore } from "../zustand/authStore"
import { loginSchema, registerSchema } from "../utils/validationSchemas"

export const useAuth = () => {
  const navigate = useNavigate()
  const { login, logout, register: registerUser, error, clearError } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const loginForm = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const registerForm = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullname: "",
      employeeId: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleLogin = async (data) => {
    setIsLoading(true)
    try {
      await login(data)
      toast.success("Login successful!")
      navigate("/")
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again."
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (data) => {
    setIsLoading(true)
    try {
      await registerUser(data)
      toast.success("Registration successful!")
      navigate("/")
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Please try again."
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Logout failed. Please try again.")
    }
  }

  return {
    loginForm,
    registerForm,
    handleLogin,
    handleRegister,
    handleLogout,
    isLoading,
    error,
    clearError,
  }
}

