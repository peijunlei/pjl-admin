
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import { Router } from './router';
import { useSettings } from './store/settingStore';
import { colorPrimarys } from './theme';
import { useEffect } from 'react';
import { ThemeMode } from '#/enum';

function App() {
  const { themeColorPresets, themeMode } = useSettings()
  useEffect(() => {
    const logo = `

██████╗░███████╗██╗░░░░░██╗██╗░░░██╗███╗░░██╗██╗░░░░░███████╗██╗
██╔══██╗██╔════╝██║░░░░░██║██║░░░██║████╗░██║██║░░░░░██╔════╝██║
██████╔╝█████╗░░██║░░░░░██║██║░░░██║██╔██╗██║██║░░░░░█████╗░░██║
██╔═══╝░██╔══╝░░██║██╗░░██║██║░░░██║██║╚████║██║░░░░░██╔══╝░░██║
██║░░░░░███████╗██║╚█████╔╝╚██████╔╝██║░╚███║███████╗███████╗██║
╚═╝░░░░░╚══════╝╚═╝░╚════╝░░╚═════╝░╚═╝░░╚══╝╚══════╝╚══════╝╚═╝
`;
    console.info("%c" + logo, `color: ${colorPrimarys[themeColorPresets]}`);
  }, [themeColorPresets])
  const algorithm = themeMode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;
  return (
    <ConfigProvider theme={{
      cssVar: true,
      token: {
        colorPrimary: colorPrimarys[themeColorPresets],
      },
      algorithm,
      components: {
        Layout: {
          // siderBg: 'red',
        }
      }

    }}>
      <AntdApp style={{ height: '100%' }}>
        <Router />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
