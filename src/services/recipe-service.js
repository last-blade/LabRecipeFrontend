// services/recipe-service.js or .ts
import axios from "../lib/axios"; // assuming this is your axios wrapper

export const deleteRecipe = async (recipeId) => {
  try {
    const res = await axios.delete(`/api/v1/recipe/delete-recipe/${recipeId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete recipe.";
  }
};
