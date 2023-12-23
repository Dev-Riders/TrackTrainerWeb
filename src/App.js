import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import ListaUsuarios from './Components/ListaUsuarios/ListaUsuarios';
import DetalleUsuario from './Components/DetalleUsuario/DetalleUsuario';
import ListaEjercicios from './Components/ListaEjercicios/ListaEjercicios'; // Asegúrate de tener este componente
import EditarEjercicio from './Components/EditarEjercicio/EditarEjercicio'; // Asegúrate de tener este componente

const App = () => {
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));

    return (
        <>
            <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={authenticated ? <Navigate to="/admin" /> : <Login setAuthenticated={setAuthenticated} />} />

                {authenticated ? (
                    <>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/lista" element={<ListaUsuarios />} />
                        <Route path="/usuario/:id" element={<DetalleUsuario />} />
                        <Route path="/ejercicios" element={<ListaEjercicios />} />
                        <Route path="/editar-ejercicio/:id" element={<EditarEjercicio />} />
                    </>
                ) : (
                    <>
                        <Route path="/admin" element={<Navigate to="/login" />} />
                        <Route path="/lista" element={<Navigate to="/login" />} />
                        <Route path="/usuario/:id" element={<Navigate to="/login" />} />
                        <Route path="/ejercicios" element={<Navigate to="/login" />} />
                        <Route path="/editar-ejercicio/:id" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </>
    );
};

export default App;
