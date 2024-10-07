

export const commonRoutes = {
	login: () => import("@/pages/login/index"),
	loginCode: () => import("@/pages/login-code/index"),
  404: () => import("@/pages/404/index"),

}
export const authRoutes  = {
	home: () => import("@/pages/home/index"),
	application_demo1: () => import("@/pages/application/demo1/index"),
	application_demo2: () => import("@/pages/application/demo2/index"),
	setting_system_api: () => import("@/pages/setting/system/api/index"),
	setting_auth_role: () => import("@/pages/setting/auth/role/index"),
	setting_auth_menu: () => import("@/pages/setting/auth/menu/index"),
};
