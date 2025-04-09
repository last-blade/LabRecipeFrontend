import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

// Base API URL
const API_URL = "https://labrecipebackend.onrender.com/api/v1";

// Create axios instance with default config
const api = axios.create({
  baseURL: "https://labrecipebackend.onrender.com/api/v1",
  withCredentials: true, // ✅ required to send/receive cookies
  headers: {
    "Content-Type": "application/json",
  },
});


// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // Get the accessToken from cookies
    const token = Cookies.get("accessToken");
    console.log("Token from cookies:", token); // Debugging line 
    if (token) {
      // console.log("Token retrieved from cookies:", token); // Debugging line
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("No token found in cookies."); // Debugging line
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong. Please try again.";

    // Handle 401 errors (Unauthorized)
    if (error.response?.status === 401) {
      console.log("Unauthorized, logging out..."); // Debugging line
      Cookies.remove("accessToken");
    }

    toast.error(message);
    return Promise.reject(error);
  }
);

// Auth services
// console.log("Auth service initialized"); // Debugging line
export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/user/login", credentials);
      // After successful login, check if accessToken is available and store it in cookies
      if (response.data.accessToken) {
        Cookies.set("accessToken", response.data.accessToken, { expires: 7 });
        console.log("Token set in cookies:", response.data.accessToken); // Debugging line
      } else {
        console.log("No accessToken received from backend"); // Debugging line
      }
      return response.data;
    } catch (error) {
      throw error; // Rethrow the error to propagate it
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/user/logout");
      Cookies.remove("accessToken"); // Remove accessToken from cookies
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/user/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Recipe services
export const recipeService = {
  createRecipe: async (recipeData) => {
    try {
      const response = await api.post(
        "https://labrecipebackend.onrender.com/api/v1/recipe/create-recipe",
        recipeData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllRecipes: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(
        `https://labrecipebackend.onrender.com/api/v1/recipe/view-all-recipes?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRecipe: async (recipeId) => {
    try {
      const response = await api.get(
        `https://labrecipebackend.onrender.com/api/v1/recipe/view-recipe/${recipeId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateRecipe: async (recipeId, recipeData) => {
    try {
      const response = await api.put(
        `https://labrecipebackend.onrender.com/api/v1/recipe/edit-recipe/${recipeId}`,
        recipeData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteRecipe: async (recipeId) => {
    try {
      const response = await api.delete(`/recipe/delete-recipe/${recipeId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchRecipes: async (query) => {
    try {
      const response = await api.get(`/recipe/search-recipes?q=${query}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTotalRecipes: async () => {
    try {
      const response = await api.get("/recipe/total-recipes");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
