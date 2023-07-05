import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const DetalleUsuario = () => {
    const { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuario = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`http://localhost:25513/api/administrador/usuarios/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsuario(data);
                } else {
                    console.error('Error al obtener los datos del usuario');
                }
            } catch (error) {
                console.error('Error al conectar con la API');
            } finally {
                setLoading(false);
            }
        };

        fetchUsuario();
    }, [id]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleDisableAccount = async () => {
        try {
            const response = await fetch(`http://localhost:25513/api/administrador/usuarios/${id}`, {
                method: 'PUT',
            });
            if (response.ok) {
                // Lógica adicional si es necesario
                console.log('Cuenta deshabilitada correctamente');
            } else {
                console.error('Error al deshabilitar la cuenta del usuario');
            }
        } catch (error) {
            console.error('Error al conectar con la API');
        }
    };

    const handleEnableAccount = async () => {
        try {
            const response = await fetch(`http://localhost:25513/api/administrador/usuarios/${id}`, {
                method: 'PUT',
            });
            if (response.ok) {
                // Lógica adicional si es necesario
                console.log('Cuenta habilitada correctamente');
            } else {
                console.error('Error al habilitar la cuenta del usuario');
            }
        } catch (error) {
            console.error('Error al conectar con la API');
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!usuario) {
        return <div>No se encontró el usuario</div>;
    }

    return (
        <div>
            <h2>Detalle de Usuario</h2>

            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" value={usuario.nombre} disabled={!editMode} />

            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" value={usuario.apellido} disabled={!editMode} />

            <label htmlFor="nickname">Nickname:</label>
            <input type="text" id="nickname" value={usuario.nickname} disabled={!editMode} />

            <label htmlFor="correo">Correo:</label>
            <input type="email" id="correo" value={usuario.correo} disabled={!editMode} />

            <label htmlFor="verificado">Verificado:</label>
            <input type="checkbox" id="verificado" checked={usuario.verified} disabled={!editMode} />

            {editMode ? (
                <button className="btn btn-primary" onClick={handleDisableAccount}>
                    Deshabilitar cuenta
                </button>
            ) : (
                <>
                    <button className="btn btn-primary" onClick={handleEdit}>
                        Editar
                    </button>
                    <button className="btn btn-primary" onClick={handleDisableAccount}>
                        Deshabilitar cuenta
                    </button>
                </>
            )}

            {editMode && (
                <>
                    <button className="btn btn-primary">Guardar</button>
                    <button className="btn btn-primary" onClick={handleEnableAccount}>
                        Habilitar cuenta
                    </button>
                </>
            )}

            <Link to="/">Volver</Link>
        </div>
    );
};

export default DetalleUsuario;
