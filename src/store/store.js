import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';

/*
 se crea un middleware para convertir las peticiones asincronas en sincronas
 para poder modificar el state
*/
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk ) // trabajar accionas asíncronas
    )
); 