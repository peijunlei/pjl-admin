

import { Button, Flex } from 'antd'

import icon from '@/assets/image/404.gif';
import { Link } from 'react-router-dom';

export default function Index() {
  console.log('404',import.meta.env.VITE_BASE_API)
  return (
    <Flex vertical align='center' justify='center' style={{ height: '100%' }}>
      <h1 style={{ fontSize: 60 }}>404</h1>
      <div style={{ width: '100%', height: 400, background: `url(${icon}) no-repeat center` }} ></div>
      <Button type="primary" >
        <Link to={import.meta.env.VITE_HOME_PAGE}>返回首页</Link>
      </Button>
    </Flex>
  )
}