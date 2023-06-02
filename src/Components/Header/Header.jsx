import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import AdminDashboard from '../AdminDashboard/AdminDashboard';

const Header = ({ authenticated, setAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Restablecer estado de autenticación
        setAuthenticated(false);
        // Eliminar el token del almacenamiento local
        localStorage.removeItem('token');
        // Redirigir a la página de inicio
        navigate('/');
    };

    return (
        <header>
            <div className="logo">
                <Link to="/">TrackTrainer</Link>
            </div>
            <div className="auth-buttons">
                {authenticated ? (
                    <>
                        <Link onClick={handleLogout}>Cerrar sesión</Link>
                        <Link to="/admin">Admin Dashboard</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Iniciar sesión</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
