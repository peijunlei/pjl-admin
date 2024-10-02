
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, QuestionCircleOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, ColorPicker, Divider, Drawer, Dropdown, Flex, FloatButton, Layout, Menu, Radio, Switch, Tabs, theme, Tooltip } from "antd"
import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import cn from 'classnames'
import useLocale from "@/locales/useLocale"
import SiderNav from "./sider-nav"
import { arryToTree } from "@/utils"
import { ROUTES } from "@/constants/routes"
import { useSettingActions, useSettings } from "@/store/settingStore"
import { ThemeColorPresets, ThemeMode } from "#/enum"
import { colorPrimarys } from "@/theme"
const { Header, Sider, Content } = Layout

const tree = arryToTree(ROUTES)

const TAB_MAP = tree.reduce((map, item) => {
  map.set(item.path, item.name)
  if (item.children && item.children.length > 0) {
    item.children.forEach((child) => {
      map.set(child.path, child.name)
      if (child.children && child.children.length > 0) {
        child.children.forEach((c) => {
          map.set(c.path, c.name)
        })
      }
    })
  }
  return map
}, new Map())

export default function DashboardLayout() {
  const navgate = useNavigate()
  const settings = useSettings()
  const { setSettings } = useSettingActions()
  const [scrolled, setScrolled] = useState(false)
  const [drawOpen, setDrawOpen] = useState(false)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [tabKeys, setTabKeys] = useState<string[]>([])
  const location = useLocation()
  const conRef = useRef(null)
  const { setLocale, currentLang } = useLocale()
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();
  useEffect(() => {
    setTabKeys((keys) => {
      if (keys.includes(location.pathname)) {
        return keys
      }
      return [...keys, location.pathname]
    })
  }, [location.pathname])
  return (
    <Layout style={{ height: '100%' }}>
      <SiderNav />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className={cn({
          scrolled: false,
        })}>
          <Flex align="center" justify="flex-end">
            <Button
              type="text"
              onClick={() => {
                setLocale(currentLang === 'zh_CN' ? 'en_US' : 'zh_CN')
              }}
              style={{
                width: 64,
                height: 64,
              }}
            > {currentLang === 'zh_CN' ? 'EN' : '中文'}</Button>
          </Flex>

        </Header>
        <Tabs
          activeKey={location.pathname}
          onChange={(key) => {
            navgate(key)
          }}
          items={tabKeys.map((key) => ({
            key,
            label: TAB_MAP.get(key)
          }))}
        />
        <Content className="container" ref={conRef}>
          <Outlet />
          <FloatButton.Group shape="circle" >
            <FloatButton.BackTop target={() => conRef.current!} />
            <FloatButton icon={<SettingOutlined />} type="primary" onClick={() => setDrawOpen(true)} />
          </FloatButton.Group>
        </Content>
        <Drawer title="主题设置" onClose={() => setDrawOpen(false)} open={drawOpen} closeIcon={null}>
          <Divider dashed style={{ borderColor: colorPrimary }} >主题模式</Divider>
          <Flex>
            <Tooltip title='明亮'>
              <Card
                hoverable
                onClick={() => {
                  setSettings({
                    ...settings,
                    themeMode: ThemeMode.Light,
                  })
                }}
              >明亮</Card>
            </Tooltip>
            <Tooltip title='暗黑'>
              <Card
                hoverable
                onClick={() => {
                  setSettings({
                    ...settings,
                    themeMode: ThemeMode.Dark,
                  })
                }}
              >暗黑</Card>
            </Tooltip>
          </Flex>
          <Divider dashed style={{ borderColor: colorPrimary }} >预设颜色</Divider>
          <Flex>
            {
              Object.entries(colorPrimarys).map(([key, value]) => {
                return (
                  <Tooltip title={key} key={key}>
                    <Card
                      hoverable
                      onClick={() => {
                        setSettings({
                          ...settings,
                          themeColorPresets: key as ThemeColorPresets,
                        })
                      }}
                      style={{ background: value }}
                    />
                  </Tooltip>
                )
              })
            }
          </Flex>
        </Drawer>
      </Layout>
    </Layout>
  )
}

