import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { db, googleAuthProvider } from '../firebase/firebase-config'
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

/*
 antes, el login llamaba al dispatch con la accion sincrona login,
 el hacer login a una database es asincrona, por lo que startLoginEmailPassword
 es asincrona y hace el dispatch a la accion sincrona login (middleware)
*/

//acción asíncrona, retorna un callback
export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
        //setTimeout lo hace asíncrono
        dispatch(startLoading());
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName, user.photoURL));
            })
            .catch(e => {
                console.log('printear error')
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.message,
                  });
            })
            .finally(() => {
                dispatch(finishLoading());
            })
    }
}

//accion de crear un usuario (promesas)
// export const startRegisterWithEmailPasswordName = ( email, password, name ) => {

//     return ( dispatch ) => {
//         const auth = getAuth();

//         createUserWithEmailAndPassword(auth, email, password)
//             .then(({ user }) => {
//                  dispatch(login(user.uid, user.email))
//                 updateProfile(user, { displayName: name });
//                 console.log(user)
//             })
//     }
// }

//accion de crear un usuario (promesas)
export const startRegisterWithEmailPasswordName = ( email, password, name ) => {

    return ( dispatch ) => {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({ user }) => {
                
                await updateProfile(user, { displayName: name });
                dispatch(login(user.uid, user.email, user.photoURL))
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.message,
                  });
            });
    }
}

//acción de google
export const startGoogleLogin = () => {
    return ( dispatch ) => {
        const auth = getAuth();

        // recibe el auth y el método de autenticacion, es decir, google (github, facebook, etc)
        signInWithPopup(auth, googleAuthProvider)
            .then( ({ user }) => {
                dispatch(login(user.uid, user.displayName, user.photoURL));
            });
    }
}


// acción síncrona
export const login = (uid, displayName, photoURL) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        photoURL
    }
});

// al usar firebase, es asincrono. Entonces, se debe usar el 
// dispatch del thunk para convertirlo en sincrono y usar (async, await o las promesas(then, catch, finally))
export const startLogout = () => {
    return async ( dispatch ) => {
        const auth = getAuth();
        await signOut(auth);
        
        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout
});
