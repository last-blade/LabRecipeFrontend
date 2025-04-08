// "use client";

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Button from "../components/ui/Button";
// import Card, { CardHeader, CardBody } from "../components/ui/Card";
// import axios from "axios";

// const ViewAllRecipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/v1/recipe/view-all-recipes",
//           {
//             withCredentials: true,
//           }
//         );
//         // Adjusting based on expected backend response format
//         const allRecipes =
//           response.data.data?.labRecipes || response.data.labRecipes || [];
//         setRecipes(allRecipes);
//       } catch (error) {
//         console.error("Error fetching recipes:", error);
//         setError("Failed to load recipes. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//         All Recipes
//       </h1>

//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-100">
//           {error}
//         </div>
//       )}

//       {isLoading ? (
//         <div className="flex justify-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//         </div>
//       ) : (
//         <Card>
//           <CardBody>
//             {recipes.length === 0 ? (
//               <div className="text-center text-gray-500 dark:text-gray-400">
//                 No recipes found.
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                   <thead className="bg-gray-50 dark:bg-gray-800">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                         Title
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                         Shade
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                         ETD
//                       </th>
//                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
//                     {recipes.map((recipe) => (
//                       <tr
//                         key={recipe._id}
//                         className="hover:bg-gray-50 dark:hover:bg-gray-800"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">
//                             {recipe.party} - {recipe.lotNo}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-500 dark:text-gray-400">
//                             {recipe.shade}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-500 dark:text-gray-400">
//                             {recipe.etd}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <Link to={`/recipe/${recipe._id}`}>
//                             <Button variant="outline" size="sm">
//                               View Details
//                             </Button>
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </CardBody>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default ViewAllRecipes;
