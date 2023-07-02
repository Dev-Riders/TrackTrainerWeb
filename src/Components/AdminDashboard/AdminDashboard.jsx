import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

// Componente que representa el panel de administrador
const AdminDashboard = () => {
    return (
        <div className="admin-dashboard-container">
            <h2 className="admin-dashboard-heading">Panel de administrador</h2>
            <Link to="/lista" className="admin-dashboard-link">Ver lista de usuarios</Link>
        </div>
    );
};

export default AdminDashboard;
