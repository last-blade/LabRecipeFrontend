import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import RecipeList from "./pages/RecipeList";
import RecipeForm from "./pages/RecipeForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ViewRecipe from "./pages/ViewRecipe";
import { useAuthStore } from "./zustand/authStore";

// ✅ Protected route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, hasHydrated } = useAuthStore();

  if (!hasHydrated) return null; // wait for Zustand to load

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const LoginRoute = () => {
  const { isAuthenticated, hasHydrated } = useAuthStore();
  if (!hasHydrated) return null;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />;
};

// ✅ Signup route wrapper (reactive redirect)
const SignupRoute = () => {
  const { isAuthenticated, hasHydrated } = useAuthStore();
  if (!hasHydrated) return null;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />;
};


const App = () => {
  const { hasHydrated } = useAuthStore();

  // ✅ Wait for Zustand hydration
  if (!hasHydrated) return null;

  return (
    <Router basename="/">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: { style: { background: "#10b981" } },
          error: { style: { background: "#ef4444" } },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Redirect to /dashboard if already logged in */}
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/signup" element={<SignupRoute />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes"
          element={
            <ProtectedRoute>
              <Layout>
                <RecipeList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe/new"
          element={
            <ProtectedRoute>
              <Layout>
                <RecipeForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe/edit/:recipeId"
          element={
            <ProtectedRoute>
              <Layout>
                <RecipeForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe/:recipeId"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewRecipe />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
