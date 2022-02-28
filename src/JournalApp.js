import React from 'react';
import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

/* 
Provider (react-redux) = UserContext.Provider
*/

export const JournalApp = () => {   
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    );
};
