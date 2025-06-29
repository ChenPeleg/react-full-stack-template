import type { MetaFunction } from 'react-router';
import { Outlet } from 'react-router';
import { useTranslation } from '~/translations/useTranslations';

export const meta: MetaFunction = () => {
  return [
    { title: "New React App" },
    { name: "description", content: "Welcome to React!" },
  ];
};

export default function About() {
  const t = useTranslation();
  return (
    <div className="flex h-screen items-center justify-center bg-containerMain text-onPrimary">
      <div className="flex h-screen items-center justify-center">
        {t('about Layout')}
        <Outlet/>
      </div>
    </div>
  );
}
