import { Spin } from "antd";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import DashboardLayout from "../layout/dashboard";


export function Router() {
  const router = createHashRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "/dashboard",
          element: 'dashboard',
        }
      ]
    },
    {
      path: "/login",
      element: "Login",
    },
    {
      path: "/404",
      element: "404",
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    }
  ])
  return (
    <RouterProvider router={router} fallbackElement={<Spin size="large" />} />
  )
}