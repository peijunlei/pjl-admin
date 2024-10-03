import { Button, Card, Checkbox, Divider, Flex, Form, Input, Space } from "antd";

import bgIcon from '@/assets/image/login_bg.png'
import { useNavigate } from "react-router-dom";
import { SettingFilled, UserOutlined } from "@ant-design/icons";

export default function Login() {
  const navgate = useNavigate()

  return (
    <Flex align="center" justify="center" style={{
      height: '100%',
      backgroundImage: `url(${bgIcon})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} >
      <Card
        title='验证码登录'
        actions={[
          <Button onClick={() => {
            navgate('/login')
          }} >邮箱登录</Button>,
          <Button >注册账号</Button>,
        ]}
      >
        <Form
          onFinish={(values) => {
            console.log('登录', values)
          }}
        >
          <Form.Item name='email' rules={[{ required: true, whitespace: true }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name='code' rules={[{ required: true }]}>
            <Space.Compact style={{ width: '100%' }}>
              <Input />
              <Button type="primary">发送验证码</Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item>
          <Button block type="primary" htmlType="submit" shape="round">登录</Button>

          </Form.Item>
        </Form>
      </Card>

    </Flex>
  )
}