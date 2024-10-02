import { ROUTES } from "@/constants/routes";
import { usePathname } from "@/hooks/usePathname";
import { useSettings } from "@/store/settingStore";
import { arryToTree } from "@/utils";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { Flex, Layout, Menu } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const { Sider } = Layout


const tree = arryToTree(ROUTES)

export default function SiderNav() {
  const pathname = usePathname()
  const {themeMode} = useSettings()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const firstMenus = useMemo(() => {
    return tree.map((item) => {
      let toPath = `/${item.route}`
      if (item.children && item.children.length > 0) {
        toPath += `/${item.children[0].route}`
        if (item.children[0].children && item.children[0].children.length > 0) {
          toPath += `/${item.children[0].children[0].route}`
        }
      }
      return {
        key: `/${item.route}`,
        label: <Link to={toPath}>{item.name}</Link>
      }
    })
  }, [])
  const secondMenus = useMemo(() => {
    const keys = pathname.split('/').filter(Boolean)
    if (keys.length > 1) {
      const first = keys[0]
      const firstItem = tree.find((item) => item.route === first)
      if (firstItem && firstItem.children && firstItem.children.length > 0) {
        return firstItem.children.map((item) => {
          if (item.children && item.children.length > 0) {
            const toPath = `/${first}/${item.route}`
            return {
              key: toPath,
              label: item.name,
              icon: <SettingOutlined />,
              children: item.children.map((child) => {
                const toPath = `/${first}/${item.route}/${child.route}`
                return {
                  key: toPath,
                  label: <Link to={`/${first}/${item.route}/${child.route}`}>{child.name}</Link>
                }
              })
            }
          } else {
            const toPath = `/${first}/${item.route}`
            return {
              key: toPath,
              label: <Link to={toPath}>{item.name}</Link>
            }
          }
        })
      }
    }
    return []
  }, [pathname, tree])

  const selectedKeys = useMemo(() => {
    const keys = pathname.split('/').filter(Boolean)
    return [`/${keys[0]}`]
  }, [pathname])

  useEffect(() => {
    const keys = pathname.split('/')
    const _openKeys = keys.slice(0, 3).join('/')
    setOpenKeys([_openKeys])
  }, [pathname])
  return (
    <>
      <Sider
        trigger={null}
        width={80}
        style={{
        }}>
        <Menu
          theme={themeMode}
          mode="inline"
          selectedKeys={selectedKeys}
          items={firstMenus}
        />
      </Sider>
      {
        secondMenus.length > 0 && (
          <Sider collapsible onCollapse={(collapsed) => {
            // 收起后，会把openKeys清空，所以展开时，需要重新设置openKeys
            if (!collapsed) {
              const keys = pathname.split('/')
              const _openKeys = keys.slice(0, 3).join('/')
              setOpenKeys([_openKeys])
            }
          }}>
            <Menu
              theme={themeMode}
              mode="inline"
              openKeys={openKeys}
              onOpenChange={(keys) => setOpenKeys(keys)}
              selectedKeys={[pathname]}
              items={secondMenus}
            />
          </Sider>
        )
      }

    </>
  )
}