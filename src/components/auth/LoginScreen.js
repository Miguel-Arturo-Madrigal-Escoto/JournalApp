import React, { Fragment,} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { startLoading } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch(); /* hacer dispatch de acciones, sobre los reducers del store */

    const { loading } = useSelector(state => state.ui);
    // const state = useSelector(state => state);

    // console.log(state)
    
    const [ formValues, handleInputChange, ] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        /* hacer el dispatch de la acción, useDispatch = dispatch del useReducer */
        dispatch(startLoginEmailPassword(email, password));
    }

    const handleLoginWithGoogle = () => {
        //hace la autenticación con google
        dispatch(startGoogleLogin());
    }

    
    return (
        <Fragment>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={ handleLogin } className="animate__animated animate__fadeIn animate_faster">
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={ handleLoginWithGoogle }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>
            </form>
        </Fragment>
    )
};
