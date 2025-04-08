"use client"

import { useState, useEffect, useCallback } from "react"
import { recipeService } from "../services/api"
import toast from "react-hot-toast"

export const useRecipeList = () => {
  const [recipes, setRecipes] = useState([])
  const [totalRecipes, setTotalRecipes] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [limit] = useState(10)

  const fetchRecipes = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await recipeService.getAllRecipes(currentPage, limit)
      // Handle different response structures
      const recipeData = response.recipes || response.data || []
      setRecipes(recipeData)

      // Get total count
      try {
        const totalResponse = await recipeService.getTotalRecipes()
        setTotalRecipes(totalResponse.total || totalResponse.count || 0)
      } catch (error) {
        console.error("Error fetching total recipes:", error)
        // If we can't get the total, use the length of the current page
        setTotalRecipes(recipeData.length)
      }
    } catch (error) {
      console.error("Fetch recipes error:", error)
      toast.error("Failed to load recipes")
      setRecipes([])
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, limit])

  const searchRecipes = useCallback(async () => {
    if (!searchQuery) {
      fetchRecipes()
      return
    }

    setIsLoading(true)
    try {
      const response = await recipeService.searchRecipes(searchQuery)
      const recipeData = response.recipes || response.data || []
      setRecipes(recipeData)
      setTotalRecipes(recipeData.length)
    } catch (error) {
      console.error("Search recipes error:", error)
      toast.error("Failed to search recipes")
      setRecipes([])
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery, fetchRecipes])

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await recipeService.deleteRecipe(recipeId)
      toast.success("Recipe deleted successfully!")
      fetchRecipes()
    } catch (error) {
      console.error("Delete recipe error:", error)
      toast.error("Failed to delete recipe")
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (searchQuery) {
      searchRecipes()
    } else {
      fetchRecipes()
    }
  }, [fetchRecipes, searchRecipes, searchQuery, currentPage])

  return {
    recipes,
    totalRecipes,
    isLoading,
    currentPage,
    limit,
    searchQuery,
    setSearchQuery,
    handlePageChange,
    handleDeleteRecipe,
  }
}

