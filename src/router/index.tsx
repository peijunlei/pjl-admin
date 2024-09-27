import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import DashboardLayout from "../layout";
import { authRoutes, commonRoutes } from "./routes";
import { lazy, Suspense, useMemo } from "react";
import Loading from "@/components/Loading";


const Login = lazy(commonRoutes.login);
const NotFound = lazy(commonRoutes[404]);
export function Router() {
  const authRouters = useMemo(() => {
    const routeMap = new Map()
    Object.keys(authRoutes).map((key) => {
      const [first, second] = key.split('_')
      if (routeMap.has(first)) {
        routeMap.set(first, [...routeMap.get(first), second])
      } else {
        routeMap.set(first, [second])
      }
    })
    // 生成路由
    const routes: any[] = [
      {
        index: true,
        element: <Navigate to={import.meta.env.VITE_HOME_PAGE} replace />
      }
    ]
    for (const [key, value] of routeMap) {
      const secondRoutes = [{
        index: true,
        element: <Navigate to={`/${key}/${value[0]}`} replace />
      }]
      for (const item of value) {
        // @ts-expect-error
        const importItem = authRoutes[`${key}_${item}`]
        const Component = lazy(importItem)
        secondRoutes.push({
          path: item,
          element: (
            <Suspense fallback={<Loading />} >
              <Component />
            </Suspense>
          )
        })

      }
      routes.push({
        path: key,
        children: secondRoutes
      })
    }
    return routes
  }, [])
  console.log(authRouters)
  const router = createHashRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        ...authRouters
        // {
        //   index: true,
        //   element: <Navigate to="/home/dashboard" replace />,
        // },
        // {
        //   path: 'home',
        //   children: [
        //     {
        //       index: true,
        //       element: <Navigate to="/home/dashboard" replace />
        //     },
        //     {
        //       path: "dashboard",
        //       element: <Suspense fallback={<Loading />} >
        //         < Dashboard />
        //       </Suspense>
        //     },
        //   ]
        // },
        // {
        //   path: "system",
        //   children: [
        //     {
        //       index: true,
        //       element: <Navigate to="/system/account" replace />,
        //     },
        //     {
        //       path: "account",
        //       element: <Suspense fallback={<Loading />} >
        //         < SystemAccount />
        //       </Suspense>
        //     },
        //     {
        //       path: "setting",
        //       element: <Suspense fallback={<Loading />} >
        //         <SystemSetting />
        //       </Suspense>
        //     }
        //   ]
        // }
      ]
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loading />} >
          <Login />
        </Suspense>
      )
    },
    {
      path: "/404",
      element: (
        <Suspense fallback={<Loading />} >
          <NotFound />
        </Suspense>
      )
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