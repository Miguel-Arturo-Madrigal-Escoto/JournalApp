import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

    //useDispatch: llamar a los reducers del combineReducers
    //useSelector: obtener información del state, recibe un callback
    const dispatch = useDispatch();
    // const state = useSelector(state => state);
    const { msgError } = useSelector(({ ui }) => ui);

    //console.log(msgError)

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));  
        }
    }
    //hacer los dispatch con las acciones a los reducers de
    //redux

    const isFormValid = () => {
        if (validator.isEmpty(name)) {
            dispatch(setError('El nombre no debe de estar vacío'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('El email es inválido'));
            return false;
        } else if ((!validator.equals(password, password2)) || (!validator.isStrongPassword(password, { minLength: 5 }))) {
            dispatch(setError('Contraseñas invalidas y/o no coinciden'));
            return false;
        }
        
        dispatch(removeError());
        return true;
    }

    return (
        <Fragment>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={ handleRegister }>
                {
                    msgError && 
                    (
                        <div>
                            { Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: msgError
                            }) }
                        </div>
                        
                    )
                }
                

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />
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
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </Fragment>
    )
};