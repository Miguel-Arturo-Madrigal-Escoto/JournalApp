import { getAuth, signInWithPopup } from 'firebase/auth';
import { db, googleAuthProvider } from '../firebase/firebase-config'
import { types } from '../types/types';

/*
 antes, el login llamaba al dispatch con la accion sincrona login,
 el hacer login a una database es asincrona, por lo que startLoginEmailPassword
 es asincrona y hace el dispatch a la accion sincrona login (middleware)
*/

//acción asíncrona, retorna un callback
export const startLoginEmailPassword = (email, password) => {
    return ( dispatch ) => {
        //setTimeout lo hace asíncrono
        setTimeout(() => {
            
            dispatch(login(123456, 'Pedro'));

        }, 3500);
    }
}

//acción de google
export const startGoogleLogin = () => {
    return ( dispatch ) => {
        const auth = getAuth();

        // recibe el auth y el método de autenticacion, es decir, google (github, facebook, etc)
        signInWithPopup(auth, googleAuthProvider )
            .then( ({ user }) => {
                dispatch(login(user.uid, user.displayName));
            });
    }
}


// acción síncrona
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});
