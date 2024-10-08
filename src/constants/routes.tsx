import React from "react";
import { DesktopOutlined, LockOutlined } from "@ant-design/icons";
interface Menu{
  id:string;
  name:string;
  parentId:string|null;
  route:string;
  icon:string|React.ReactNode|null;
}

export const ROUTES:Menu[]=[
  {
    id:'1',
    route:'home',
    name:'主页',
    parentId:null,
    icon:null
  },
  {
    id:'2',
    route:'application',
    name:'应用',
    parentId:null,
    icon:null
  },
  {
    id:'2-1',
    route:'demo1',
    parentId:'2',
    name:'应用1',
    icon:null
  },
  {
    id:'2-2',
    route:'demo2',
    parentId:'2',
    name:'应用2',
    icon:null
  },
  {
    id:'3',
    name:'设置',
    route:'setting',
    parentId:null,
    icon:null
  },
  {
    id:'3-1',
    route:'system',
    name:'系统设置',
    parentId:'3',
    icon:<DesktopOutlined />
  },
  {
    id:'3-1-1',
    route:'api',
    name:'接口列表',
    parentId:'3-1',
    icon:null
  },
  {
    id:'3-2',
    route:'auth',
    name:'权限设置',
    parentId:'3',
    icon:<LockOutlined />
  },
  {
    id:'3-2-1',
    route:'role',
    name:'角色列表',
    parentId:'3-2',
    icon:null
  },
  {
    id:'3-2-2',
    route:'menu',
    name:'菜单列表',
    parentId:'3-2',
    icon:null
  },
  
]