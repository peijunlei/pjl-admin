

export const commonRoutes = {
	login: () => import("@/pages/login/index"),
  404: () => import("@/pages/system/404/index"),

}
export const authRoutes  = {
	home_dashboard: () => import("@/pages/home/dashboard/index"),
	system_setting: () => import("@/pages/system/setting/index"),
	system_account: () => import("@/pages/system/account/index"),
};
