import React, {createContext, useContext} from 'react';

import {SessionData} from '~/models/SessionData';

export const SessionContext = createContext<SessionData>({
    avatar: "",
    userName: "",
    userId: 0,
    language: "en",
    theme: "light",
})

export const SessionProvider = ({ children , sessionData} :{
    children: React.ReactNode;
    sessionData : SessionData;
}) => {
    return (
        <SessionContext.Provider value={sessionData}>
            {children}
        </SessionContext.Provider>
    );
}
