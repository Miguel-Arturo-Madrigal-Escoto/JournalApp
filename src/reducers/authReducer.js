import { types } from "../types/types";

/*
 {
     uid:727823739821,
     name: 'Miguel'
 }

*/
export const authReducer = (state = {}, action) => {
    switch (action.type){
        case types.login:
            /* retornar id unico de firebase */
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                photoURL: action.payload.photoURL
            };

        case types.logout:
            return {};
            
        default:
           return state;
    }
        
}