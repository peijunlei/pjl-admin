
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Layout, Menu, theme } from "antd"
import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import cn from 'classnames'
const { Header, Sider, Content } = Layout
export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const conRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    //当container容器滚动100px时，设置scrolled为true,否则为false
    const handleScroll = () => {
      if (conRef.current.scrollTop > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    conRef.current.addEventListener('scroll', handleScroll)
  }, [])
  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{
          height: 32,
          margin: 4,
          fontSize: 20,
          lineHeight: '32px',
          color: '#fff',
          textAlign: 'center',
          letterSpacing: 3,
          background: `rgba(255, 255, 255, .2)`,
          borderRadius: borderRadiusLG,
        }}>
          {collapsed ? 'PJL' : 'PEIJUNLEI'}
        </div>
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
        <Header style={{ padding: 0, background: colorBgContainer }} className={cn({
          scrolled,
        })}>
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
        <Content className="container" ref={conRef}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

