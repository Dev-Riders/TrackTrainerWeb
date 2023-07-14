import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

const DetalleUsuario = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsuario = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:25513/api/administrador/usuarios/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsuario(data);
                    console.log(data);
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
    }, [id, token]);

    const handleToggleAccount = async () => {
        const action = usuario.eliminado ? 'enable' : 'disable';

        try {
            const response = await fetch(`http://localhost:25513/api/administrador/usuarios/${id}/${action}`, {
                method: 'PATCH',
                headers: {
                    Authorization: token,
                },
            });

            if (response.ok) {
                console.log(`Cuenta ${usuario.eliminado ? 'habilitada' : 'deshabilitada'} correctamente`);
                window.location.reload();
            } else {
                console.error(`Error al ${usuario.eliminado ? 'habilitar' : 'deshabilitar'} la cuenta del usuario`);
            }
        } catch (error) {
            console.error('Error al conectar con la API');
        }
    };

    if (loading) {
        return (
            <div className="loading-container text-light">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden text-light">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!usuario) {
        return (
            <div className="loading-container text-light">
                <span className="text-light">No se encontró al usuario</span>
            </div>
        );
    }

    const formattedFechaCreacion = moment(usuario.fecha_creacion).format('YYYY-MM-DD').substring(0, 10);
    const formattedFechaEliminacion = usuario.fechaEliminacion ? moment(usuario.fechaEliminacion).format('YYYY-MM-DD') : null;
    const formattedFechaActualizacion = usuario.fechaActualizacion ? moment(usuario.fechaActualizacion).format('YYYY-MM-DD') : null;

    return (
        <div className="container mt-4">
            <div className="container p-4 rounded" style={{ maxWidth: '100%', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.75)' }}>
                <h2 className="text-dark">Detalle de Usuario</h2>

                <div className="form-group row">
                    <label htmlFor="nombre" className="col-sm-2 col-form-label text-dark">Nombre:</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            id="nombre"
                            value={usuario?.nombre ?? 'N/A'}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="apellido" className="col-sm-2 col-form-label text-dark">Apellido:</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            id="apellido"
                            value={usuario?.apellido ?? 'N/A'}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="nickname" className="col-sm-2 col-form-label text-dark">Nickname:</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            id="nickname"
                            value={usuario?.nickname ?? 'N/A'}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="correo" className="col-sm-2 col-form-label text-dark">Correo:</label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            id="correo"
                            value={usuario?.correo ?? 'N/A'}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="verificado" className="col-sm-2 col-form-label text-dark">Verificado:</label>
                    <div className="col-sm-10">
                        <input type="checkbox" id="verificado" checked={usuario.verified}  />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="fecha_creacion" className="col-sm-2 col-form-label text-dark">Fecha de creación:</label>
                    <div className="col-sm-10">
                        <input
                            type="date"
                            id="fecha_creacion"
                            value={formattedFechaCreacion}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="fecha_eliminacion" className="col-sm-2 col-form-label text-dark">Fecha de eliminación:</label>
                    <div className="col-sm-10">
                        <input
                            type="date"
                            id="fecha_eliminacion"
                            value={formattedFechaEliminacion ?? 'N/A'}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="quien_elimino" className="col-sm-2 col-form-label text-dark">Quién eliminó (Id):</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            id="quien_elimino"
                            value={usuario?.quienElimino?.id ?? 'N/A'}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="fecha_actualizacion" className="col-sm-2 col-form-label text-dark">Fecha de actualización:</label>
                    <div className="col-sm-10">
                        <input
                            type="date"
                            id="fecha_actualizacion"
                            value={formattedFechaActualizacion ?? 'N/A'}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="quien_actualizo" className="col-sm-2 col-form-label text-dark">Quién actualizó:</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            id="quien_actualizo"
                            value={usuario?.quienActualizo?.id ?? 'N/A'}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-3">
                    <Link to="/lista" className="btn btn-link">
                        <button className="btn btn-primary">Volver</button>
                    </Link>

                    <div>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleToggleAccount}
                        >
                            {usuario.eliminado ? 'Habilitar cuenta' : 'Deshabilitar cuenta'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleUsuario;