import SvgIcon from "@/components/svg-icon";
import { useTranslation } from "react-i18next";



export default function Index() {
  const { t } = useTranslation();
  return (
    <div style={{ height: '300vh', padding: 10 }}>
      <h1>{t("手机号", { phone: 13100000000 })}</h1>
    </div>
  )
}