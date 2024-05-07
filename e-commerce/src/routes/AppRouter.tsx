import MainLayout from "@layouts/MainLayout/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "@pages/Error";
import Home from "@pages/Home";
import Categories from "@pages/Categories";
import Products from "@pages/Products";
import Cart from "@pages/Cart";
import Wishlist from "@pages/Wishlist";
import AllProducts from "@pages/AllProducts";
import Register from "@pages/Register";
import Login from "@pages/Login";
import ProtectedRoute from "@components/Auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "categories/products/:prefix",
        element: <Products />,
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "signup",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
