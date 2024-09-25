
import { App as AntdApp } from 'antd';
import { Router } from './router';

function App() {
  return (
    <AntdApp style={{height:'100%'}}>
      <Router />
    </AntdApp>
  )
}

export default App
