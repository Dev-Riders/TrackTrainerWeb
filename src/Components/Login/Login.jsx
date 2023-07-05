import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = e => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        axios
            .post('http://localhost:25513/api/administrador/login', {
                correo: email,
                contraseña: password,
            })
            .then(response => {
                const token = response.data;
                localStorage.setItem('token', token); // Cambiar localStorage por cookies o una solución de manejo de tokens segura
                setAuthenticated(true);
                setErrorMessage('');
                navigate('/admin');
            })
            .catch(error => {
                if (error.response) {
                    const errorMessage = error.response.data;
                    console.error('Error de inicio de sesión:', errorMessage);
                    setErrorMessage(errorMessage);
                } else {
                    console.error('Error al realizar la solicitud:', error.message);
                    setErrorMessage(
                        'Error al realizar la solicitud. Por favor, inténtalo de nuevo más tarde.'
                    );
                }
            });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Iniciar sesión</h2>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button onClick={handleLogin}>Iniciar sesión</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Login;
