import { useTranslation } from "react-i18next";



export default function Index() {
  const {t} = useTranslation();
  return (
    <div>
      dashboard
      {t('手机号')}
    </div>
  )
}