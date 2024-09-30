
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Dropdown, Flex, Layout, Menu, theme } from "antd"
import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import useLocale from "@/locales/useLocale"
const { Header, Sider, Content } = Layout
export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const { setLocale, currentLang } = useLocale()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{
          height: 32,
          margin: 16,
          background: `rgba(255, 255, 255, .2)`,
          borderRadius: borderRadiusLG,
        }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: '/home/dashboard',
              icon: <HomeOutlined />,
              label: <Link to={import.meta.env.VITE_HOME_PAGE}>主页</Link>,
            },
            {
              key: '/system/account',
              icon: <UserOutlined />,
              label: <Link to="/system/account">账户</Link>,
            },
            {
              key: '/system/setting',
              icon: <SettingOutlined />,
              label: <Link to="/system/setting">设置</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex align="center" justify="space-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'en_US',
                    label: 'English',
                    onClick: () => setLocale('en_US'),
                  },
                  {
                    key: 'zh_CN',
                    label: '中文',
                    onClick: () => setLocale('zh_CN'),
                  },
                ]
              }}
            >
              <Button type="text">
                {currentLang === 'en_US' ? 'English' : '中文'}
              </Button>
            </Dropdown>
          </Flex>

        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

