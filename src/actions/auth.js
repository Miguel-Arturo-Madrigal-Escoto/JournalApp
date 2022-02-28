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


// acción síncrona
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});
