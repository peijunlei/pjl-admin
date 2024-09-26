import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import DashboardLayout from "../layout";
import { routes } from "./routes";
import { lazy, Suspense } from "react";
import { Spin } from "antd";


const Dashboard = lazy(routes.dashboard);
const Login = lazy(routes.login);
const SystemSetting = lazy(routes.system_setting);
const SystemAccount = lazy(routes.system_account);
const NotFound = lazy(routes.not_found);
export function Router() {
  const router = createHashRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/home/dashboard" replace />,
        },
        {
          path: 'home',
          children: [
            {
              index: true,
              element: <Navigate to="/home/dashboard" replace />
            },
            {
              path: "dashboard",
              element: <Suspense fallback={<Spin size="large" />} >
                < Dashboard />
              </Suspense>
            },
          ]
        },
        {
          path: "system",
          children: [
            {
              index: true,
              element: <Navigate to="/system/account" replace />,
            },
            {
              path: "account",
              element: <Suspense fallback={<Spin size="large" />} >
                < SystemAccount />
              </Suspense>
            },
            {
              path: "setting",
              element: <Suspense fallback={<Spin size="large" />} >
                <SystemSetting />
              </Suspense>
            }
          ]
        }
      ]
    },
    {
      path: "/login",
      element: <Suspense fallback={<Spin size="large" />} >
        <Login />
      </Suspense>
    },
    {
      path: "/404",
      element: <Suspense fallback={<Spin size="large" />} >
        <NotFound />
      </Suspense>
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}