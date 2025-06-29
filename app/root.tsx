import type {LinksFunction, LoaderFunctionArgs} from 'react-router';
import {Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData} from 'react-router';
import {ErrorBoundary} from '~/components/ErrorBoundary';

import './tailwind.css';
import {FlashMessages} from '~/UI/FlashMessages';
import {getMessages} from '~/_core/server/messages.server';

import React from 'react';
import {SessionProvider} from '~/_core/sessionContext';
import {getSession} from '~/_core/server/session.server';
import {getLangDirection} from '~/translations/getLangDirection';


export const links: LinksFunction = () => [{
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com'
}, {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
}, {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
},];

export function Layout({children}: { children: React.ReactNode }) {
    const loaderData = useLoaderData();
    const language = loaderData?.session?.language || 'en';
   const dir = getLangDirection(loaderData?.session?.language);
    return (<html lang={language} dir={dir}>
    <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Meta/>
        <Links/>
        <title>PC - WORKER</title>
    </head>
    <body>
    {children}
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>);
}

export async function loader({request}: LoaderFunctionArgs) {
    const messages = await getMessages(request);
    const session = await getSession(request)
    return Response.json({
        session: session.data,
        messages: {
            success: messages.success,
            error: messages.error,
        },
    });
}

export default function App() {
    const loaderData = useLoaderData();


    return (<SessionProvider sessionData={loaderData.session}>
            <ErrorBoundary>
                <Outlet/>
                <FlashMessages messages={loaderData?.messages}/>
            </ErrorBoundary>
        </SessionProvider>);
}
