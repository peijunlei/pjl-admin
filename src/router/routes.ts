


export const routes  = {
	login: () => import("@/pages/login/index"),
	dashboard: () => import("@/pages/home/dashboard/index"),
	system_setting: () => import("@/pages/system/setting/index"),
	system_account: () => import("@/pages/system/account/index"),
  not_found: () => import("@/pages/system/404/index"),
};
