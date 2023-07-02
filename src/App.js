import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import ListaUsuarios from './Components/ListaUsuarios/ListaUsuarios';

const App = () => {
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));

    return (

            <>
                <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={authenticated ? <Navigate to="/admin" /> : <Login setAuthenticated={setAuthenticated} />}
                    />
                    {authenticated ? (
                        <Route path="/admin" element={<AdminDashboard />} />
                    ) : (
                        <Route path="/admin" element={<Navigate to="/login" />} />
                    )}
                    {authenticated ? (
                        <Route path="/lista" element={<ListaUsuarios />} />
                    ) : (
                        <Route path="/lista" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </>
    );
};

export default App;
