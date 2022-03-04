import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
 
export const RegisterScreen = () => {

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
            console.log('Form correct')
        }
    }

    const isFormValid = () => {
        if (validator.isEmpty(name)) {
            console.log('Invalid name');
            return false;
        } else if (!validator.isEmail(email)) {
            console.log('Invalid email');
            return false;
        } else if ((!validator.equals(password, password2)) || (!validator.isStrongPassword(password, [{ minLenght: 5 }]))) {
            console.log('Invalid password');
            return false;
        }
        
        return true;
    }

    return (
        <Fragment>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={ handleRegister }>

                <div className="auth__alert-error">
                    Hola mundo
                </div>

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