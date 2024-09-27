/// <reference types="vite/client" />
interface ImportMetaEnv {
  /**
   * 首页路由
   */
  readonly VITE_HOME_PAGE: string
  /**
   * 请求接口
   */
  readonly VITE_BASE_API: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}