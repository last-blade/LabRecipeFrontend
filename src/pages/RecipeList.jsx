"use client";
import { Link } from "react-router-dom";
import { Search, Edit, Trash, Eye, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Card, { CardHeader, CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { deleteRecipe } from "../services/recipe-service";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  // Fetch all recipes on mount
  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://labrecipebackend.onrender.com/api/v1/recipe/total-recipes",
          { withCredentials: true }
        );
        let fetchedRecipes = response.data.data[0].recipesData || [];
        console.log(fetchRecipes)
        console.log(response);
        // Sort by partyName and registerNo
        fetchedRecipes.sort((a, b) => {
          const nameA = a.partyName.toLowerCase();
          const nameB = b.partyName.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;

          const regA = a.registerNo.toLowerCase();
          const regB = b.registerNo.toLowerCase();
          return regA.localeCompare(regB);
        });

        setRecipes(fetchedRecipes);
        console.log("recipes",recipes);
        setFilteredRecipes(fetchedRecipes);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes on search
  useEffect(() => {
    const filtered = recipes.filter((recipe) => {
      const query = searchQuery.toLowerCase();
      return (
        recipe.partyName.toLowerCase().includes(query) ||
        recipe.registerNo.toLowerCase().includes(query)
      );
    });

    setFilteredRecipes(filtered);
  }, [searchQuery, recipes]);

  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await deleteRecipe(recipeId);
      toast.success("Recipe deleted successfully!");

      // Remove the deleted recipe from local state
      setRecipes((prev) => prev.filter((r) => r._id !== recipeId));
    } catch (error) {
      toast.error(error?.message || "Failed to delete recipe.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
  
    try {
      // Remove leading '+' if present
      let cleaned = dateString.startsWith('+') ? dateString.slice(1) : dateString;
  
      // Handle wrong years like 202025 → fix to 2025
      const yearFixMatch = cleaned.match(/20(\d{2})\d{2}/); // e.g., 202025
      if (yearFixMatch) {
        const correctYear = `20${yearFixMatch[1]}`; // -> 2025
        cleaned = cleaned.replace(/20\d{4}/, correctYear);
      }
  
      const date = new Date(cleaned);
  
      if (isNaN(date.getTime())) return "Invalid Date";
  
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
  
      return `${day}/${month}/${year}`;
    } catch {
      return "Invalid Date";
    }
  };
  

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recipe List
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Total {filteredRecipes.length} Recipes
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              name="search"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
            />
            <Link to="/recipe/new">
              <Button variant="primary">
                <Plus size={18} className="mr-2" />
                Add Recipe
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardBody>
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="w-full max-w-full overflow-auto max-h-[600px] border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Party
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Fabric
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    RegNo.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Lot No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Shade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    | View Edit Delete |
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredRecipes.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No Results Found
                    </td>
                  </tr>
                ) : (
                  filteredRecipes.map((recipe) => (
                    <tr
                      key={recipe._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {recipe.partyName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {recipe.fabricName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {recipe.registerNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {recipe.lotNo}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {recipe.shade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(recipe.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link to={`/recipe/${recipe._id}`}>
                            <Button variant="outline" size="sm">
                              <Eye size={16} />
                            </Button>
                          </Link>
                          <Link to={`/recipe/edit/${recipe._id}`}>
                            <Button variant="outline" size="sm">
                              <Edit size={16} />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRecipe(recipe._id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RecipeList;