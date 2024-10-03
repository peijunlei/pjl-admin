import { Button, Card, Checkbox, Divider, Flex, Form, Input } from "antd";

import bgIcon from '@/assets/image/login_bg.png'
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

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
        title='邮箱登录'
        extra={<Button type="link">忘记密码</Button>}
        actions={[
          <Button onClick={() => {
            navgate('/login-code')
          }} >验证码登录</Button>,
          <Button >注册账号</Button>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log('登录', values)
          }}
        >
          <Form.Item name='email' rules={[{ required: true, whitespace: true }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" shape="round">登录</Button>
          </Form.Item>
        </Form>
      </Card>

    </Flex>
  )
}