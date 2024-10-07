import { Button, Card, Checkbox, Divider, Flex, Form, Input } from "antd";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "@/hooks/useRouter";

export default function Login() {
  const { replace, push } = useRouter()
  return (
    <Card
      title='邮箱登录'
      extra={<Button type="link">忘记密码</Button>}
      actions={[
        <Button onClick={() => {
          replace('/login/code')
        }} >验证码登录</Button>,
        <Button >注册账号</Button>,
      ]}
    >
      <Form
        layout="vertical"
        onFinish={(values) => {
          console.log('登录', values)
          push(import.meta.env.VITE_HOME_PAGE)
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
  )
}