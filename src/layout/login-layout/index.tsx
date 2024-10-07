import { usePathname } from "@/hooks/usePathname";
import { Flex } from "antd";
import { useOutlet } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";



import bgIcon from '@/assets/image/login_bg.png'
import { Suspense } from "react";
import ProgressBar from "@/components/progress-bar";

export default function LoginLayout() {
  const currentOutlet = useOutlet()
  const pathname = usePathname()
  return (
    <Flex align="center" justify="center" style={{
      height: '100%',
      backgroundImage: `url(${bgIcon})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} >
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={pathname}
          appear={true}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          <Suspense fallback={<ProgressBar />} >
            {currentOutlet}
          </Suspense>
        </CSSTransition>
      </SwitchTransition>
    </Flex>

  )
}