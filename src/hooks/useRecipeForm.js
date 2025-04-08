"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import toast from "react-hot-toast"
import { recipeService } from "../services/api"
import { recipeSchema } from "../utils/validationSchemas"
import { useNavigate, useParams } from "react-router-dom"

export const useRecipeForm = () => {
  const navigate = useNavigate()
  const { recipeId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [initialData, setInitialData] = useState(null)
  const isEditing = !!recipeId

  const form = useForm({
    resolver: yupResolver(recipeSchema),
    defaultValues: {
      partyName: "",
      fabricName: "",
      lotNo: "",
      registerNo: "",
      shade: "",
      date: null,
      color1: "#ff0000",
      percentage1: "",
      color2: "#00ff00",
      percentage2: "",
      color3: "#0000ff",
      percentage3: "",
      color4: "#ffff00",
      percentage4: "",
      remarks: "",
    },
  })

  // Fetch recipe data if editing
  useEffect(() => {
    const fetchRecipe = async () => {
      if (isEditing) {
        setIsLoading(true)
        try {
          const response = await recipeService.getRecipe(recipeId)
          const recipe = response.recipe || response.data

          // Format date from string to Date object if needed
          const formattedRecipe = {
            ...recipe,
            date: recipe.date ? new Date(recipe.date) : null,
          }

          setInitialData(formattedRecipe)
          form.reset(formattedRecipe)
        } catch (error) {
          toast.error("Failed to load recipe data")
          navigate("/recipes")
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchRecipe()
  }, [recipeId, isEditing, form, navigate])

  const handleSubmit = async (data) => {
    setIsLoading(true)
    console.log("Form data:", data)
    try {
      if (isEditing) {
        await recipeService.updateRecipe(recipeId, data)
        toast.success("Recipe updated successfully!")
      } else {
        await recipeService.createRecipe(data)
        toast.success("Recipe created successfully!")
        form.reset()
      }
      navigate("/recipes")
    } catch (error) {
      const message =
        error.response?.data?.message || (isEditing ? "Failed to update recipe" : "Failed to create recipe")
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    if (isEditing && initialData) {
      form.reset(initialData)
    } else {
      form.reset()
    }
  }

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    resetForm,
    isLoading,
    isEditing,
  }
}

