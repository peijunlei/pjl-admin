import { createHashRouter, Navigate, Outlet, RouterProvider, useOutlet } from "react-router-dom";
import DashboardLayout from "../layout";
import { authRoutes, commonRoutes } from "./routes";
import { lazy, Suspense, useMemo } from "react";
import { ROUTES } from "@/constants/routes";
import { arryToTree } from "@/utils";
import ProgressBar from "@/components/progress-bar";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import LoginLayout from "@/layout/login-layout";


const Login = lazy(commonRoutes.login);
const LoginCode = lazy(commonRoutes.loginCode);
const NotFound = lazy(commonRoutes[404]);
const tree = arryToTree(ROUTES)

interface treeItem {
  route: string
  children: treeItem[]
  id: string
  parentId: string | null
}
function treeToRouter(tree: treeItem[], firstRoute = import.meta.env.VITE_HOME_PAGE, parentRoute = '') {
  const routers: any[] = [
    {
      index: true,
      element: <Navigate to={firstRoute} replace />
    }
  ]
  for (const item of tree) {
    const { route, children, id } = item
    if (children && children.length > 0) {
      const first = children[0]
      const firstRoute = parentRoute ? `/${parentRoute}/${route}/${first.route}` : `/${route}/${first.route}`
      const proute = parentRoute ? `${parentRoute}_${route}` : route
      const childrenRouters = treeToRouter(children, firstRoute, proute)
      routers.push({
        path: route,
        children: childrenRouters
      })
    } else {
      const routeKey = parentRoute ? `${parentRoute}_${route}` : route
      const importItem = authRoutes[routeKey]
      const Component = lazy(importItem)
      routers.push({
        path: route,
        element: (
          // <Suspense fallback={<ProgressBar />} >
            <Component />
          // </Suspense>
        )
      })
    }
  }
  return routers
}

export function Router() {
  const outlet = useOutlet()
  const authRouters = useMemo(() => {
    return treeToRouter(tree)
  }, [])
  // console.log(authRouters)
  const router = createHashRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        ...authRouters,
        // {
        //   path: "setting",
        //   children: [
        //     {
        //       index: true,
        //       element: <Navigate to="/setting/system" replace />,
        //     },
        //     {
        //       path: "system",
        //       children: [
        //         {
        //           index: true,
        //           element: <Navigate to="/setting/system/api" replace />,
        //         },
        //         {
        //           path: "api",
        //           element: <div>api2</div>
        //         }
        //       ]
        //     },
        //     {
        //       path: "auth",
        //       children: [
        //         {
        //           index: true,
        //           element: <Navigate to="/auth/role" replace />,
        //         },
        //         {
        //           path: "role",
        //           element: <div>role</div>
        //         },
        //         {
        //           path: "menu",
        //           element: <div></div>
        //         }
        //       ]
        //     }
        //   ]
        // }
      ]
    },
    {
      path: "/login",
      element: <LoginLayout />,
      children: [
        {
          path: '',
          element: (
            <Login />
          )
        },
        {
          path: "code",
          element: (
            <LoginCode />
          )
        }
      ]
    },
    // {
    //   path: "/login",
    //   element: (
    //     <Suspense fallback={<ProgressBar />} >
    //       <Login />
    //     </Suspense>
    //   )
    // },
    // {
    //   path: "/login-code",
    //   element: (
    //     <Suspense fallback={<ProgressBar />} >
    //       <LoginCode />
    //     </Suspense>
    //   )
    // },
    {
      path: "/404",
      element: (
        <Suspense fallback={<ProgressBar />} >
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