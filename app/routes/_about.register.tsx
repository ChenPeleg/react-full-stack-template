// app/routes/about.tsx
import type { MetaFunction } from 'react-router';
import { Outlet } from 'react-router';

export const meta: MetaFunction = () => {
    return [{title: 'About Us'}, {
        name: 'description',
        content: 'Learn about our company'
    },];
};

export default function AboutLayout() {
    return (<div className="flex h-screen items-center justify-center bg-containerMain text-onPrimary">
           about me

        </div>);
}
