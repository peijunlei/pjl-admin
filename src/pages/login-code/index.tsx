import { Button, Card, Flex, Form, Input, Space } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "@/hooks/useRouter";
import { useState } from "react";
import { useCountDown } from "ahooks";

export default function Login() {
  const { push } = useRouter()

  const [targetDate, setTargetDate] = useState<number>(0);
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      console.log('倒计时结束')
    },
  });

  return (
    <Card
      title='验证码登录'
      actions={[
        <Button onClick={() => {
          push('/login')
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
            <Button
              type="primary"
              onClick={() => {
                setTargetDate(Date.now() + 10_000);
              }}
              disabled={countdown !== 0}
            >{countdown === 0 ? '发送验证码' : `已发送 ${Math.round(countdown / 1000)}s`}</Button>
          </Space.Compact>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" shape="round">登录</Button>
        </Form.Item>
      </Form>
    </Card>

  )
}