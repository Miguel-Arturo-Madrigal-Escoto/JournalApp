import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { login } from '../actions/auth';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// loading icon
import { BallTriangle } from  'react-loader-spinner';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    // mantener el estado de la aplicación
    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => { //observable, por lo que las dependencias pueden ser = []
            
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName, user.photoURL));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        })

    }, [ dispatch, setChecking, setIsLoggedIn ]);

    if (checking) {
        return (
            <div className="routers__loading">
                <BallTriangle ariaLabel="loading-indicator" color="#5C62C5" />
            </div>
        )
        
    }

    return (
        <Routes>

            <Route 
                path="/auth/*"
                element={ 
                    <PublicRoute isLoggedIn={ isLoggedIn }>
                        <AuthRouter />
                    </PublicRoute>
                }
            />
            
            <Route 
                path="/" 
                element={ 
                    <PrivateRoute isLoggedIn={ isLoggedIn }>
                        <JournalScreen />
                    </PrivateRoute>
                }
            />

            <Route 
                path="*"
                element={ <h1>404 Not Found</h1> }
            />

        </Routes>
    )
};
