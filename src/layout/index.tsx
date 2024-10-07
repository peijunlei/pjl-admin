
import { HomeOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, ColorPicker, Divider, Drawer, Dropdown, Flex, FloatButton, Form, Layout, Menu, Radio, Switch, Tabs, theme, Tooltip } from "antd"
import { Suspense, useEffect, useRef, useState } from "react"
import { useNavigate, useOutlet } from "react-router-dom"
import useLocale from "@/locales/useLocale"
import SiderNav from "./sider-nav"
import { arryToTree } from "@/utils"
import { ROUTES } from "@/constants/routes"
import { useSettingActions, useSettings } from "@/store/settingStore"
import { StorageEnum, ThemeColorPresets, ThemeMode } from "#/enum"
import { colorPrimarys } from "@/theme"
import SvgIcon from "@/components/svg-icon"
import { useThemeToken } from "@/hooks/useThemeToken"
import { removeItem } from "@/utils/storage"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { usePathname } from "@/hooks/usePathname"
import ProgressBar from "@/components/progress-bar"
const { Header, Content } = Layout

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
  const currentOutlet = useOutlet()
  const settings = useSettings()
  const { setSettings } = useSettingActions()
  const [drawOpen, setDrawOpen] = useState(false)
  const [tabKeys, setTabKeys] = useState<string[]>([])
  const pathname = usePathname()
  const conRef = useRef(null)
  const nodeRef = useRef(null);

  const { setLocale, currentLang } = useLocale()
  const { colorPrimary } = useThemeToken()

  useEffect(() => {
    setTabKeys((keys) => {
      if (keys.includes(pathname)) {
        return keys
      }
      return [...keys, pathname]
    })
  }, [pathname])
  return (
    <Layout style={{ height: '100%' }}>
      <SiderNav />
      <Layout>
        <Header style={{ padding: 0 }}>
          <Flex align="center" justify="flex-end" >

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
            <Dropdown menu={{
              items: [
                {
                  label: '个人中心',
                  key: '1',
                  icon: <UserOutlined />,
                },
                {
                  label: '退出登录',
                  key: '2',
                  icon: <LogoutOutlined />,
                  onClick: () => {
                    console.log('退出登录')
                    removeItem(StorageEnum.Token)
                    navgate('/login')
                  }
                }
              ]
            }}>
              <Button
                icon={<UserOutlined />}
                type="text"
                style={{
                  height: 64,
                }}
              >
                peijunlei
              </Button>
            </Dropdown>
          </Flex>

        </Header>
        {
          settings.multiTab && (
            <Tabs
              type="card"
              activeKey={pathname}
              onChange={(key) => { navgate(key) }}
              items={tabKeys.map((key) => ({
                key,
                label: TAB_MAP.get(key)
              }))}
            />
          )
        }
        <Content className="container" ref={conRef}>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={pathname}
              appear={true}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              <Suspense fallback={<ProgressBar />} >
                {currentOutlet}
              </Suspense>
            </CSSTransition>
          </SwitchTransition>
          <FloatButton.Group shape="circle" >
            <FloatButton.BackTop target={() => conRef.current!} />
            <FloatButton icon={<SettingOutlined />} type="primary" onClick={() => setDrawOpen(true)} />
          </FloatButton.Group>
        </Content>


        <Drawer title="主题设置" onClose={() => setDrawOpen(false)} open={drawOpen} closeIcon={null}>
          <Flex vertical gap={20}>
            <Divider dashed style={{ borderColor: colorPrimary }} >主题模式</Divider>
            <Flex justify="space-evenly">
              <Tooltip title='明亮'>
                <Card
                  hoverable
                  onClick={() => {
                    setSettings({
                      ...settings,
                      themeMode: ThemeMode.Light,
                    })
                  }}
                >
                  <SvgIcon icon="light" size={48} color={colorPrimary} />
                </Card>
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
                >
                  <SvgIcon icon="dark" size={48} color={colorPrimary} />
                </Card>
              </Tooltip>
            </Flex>
            <Divider dashed style={{ borderColor: colorPrimary }} >主题预设</Divider>
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
            <Divider dashed style={{ borderColor: colorPrimary }} >其他配置</Divider>
            <Form.Item label="页签模式">
              <Switch
                checked={settings.multiTab}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    multiTab: e
                  })
                }} />
            </Form.Item>
          </Flex>
        </Drawer>
      </Layout>
    </Layout>
  )
}

