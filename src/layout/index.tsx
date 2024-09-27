
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Layout, Menu, theme } from "antd"
import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
const { Header, Sider, Content } = Layout
export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
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
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

