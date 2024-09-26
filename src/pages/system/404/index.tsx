

import { Button, Flex } from 'antd'

import icon from '@/assets/image/404.gif';

export default function Index() {
  return (
    <Flex vertical align='center' justify='center' style={{ height: '100%' }}>
      <h1 style={{ fontSize: 60 }}>404</h1>
      <div style={{ width: '100%', height: 400, background: `url(${icon}) no-repeat center` }} ></div>
      <Button type="primary" href="/">返回首页</Button>
    </Flex>
  )
}