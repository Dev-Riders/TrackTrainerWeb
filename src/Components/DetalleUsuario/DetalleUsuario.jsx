import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

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

    const formattedFechaCreacion = moment(usuario.fecha_creacion).format('YYYY-MM-DD').substring(0, 10);
    const formattedFechaEliminacion = usuario.fecha_eliminacion ? moment(usuario.fecha_eliminacion).format('DD-MM-YYYY HH:mm:ss') : null;
    const formattedFechaActualizacion = usuario.fecha_actualizacion ? moment(usuario.fecha_actualizacion).format('DD-MM-YYYY HH:mm:ss') : null;

    return (
        <div className="container">
            <h2>Detalle de Usuario</h2>

            <div className="form-group row">
                <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre:</label>
                <div className="col-sm-10">
                    <input type="text" id="nombre" value={usuario.nombre} disabled={!editMode} className="form-control" />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="apellido" className="col-sm-2 col-form-label">Apellido:</label>
                <div className="col-sm-10">
                    <input type="text" id="apellido" value={usuario.apellido} disabled={!editMode} className="form-control" />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="nickname" className="col-sm-2 col-form-label">Nickname:</label>
                <div className="col-sm-10">
                    <input type="text" id="nickname" value={usuario.nickname} disabled={!editMode} className="form-control" />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="correo" className="col-sm-2 col-form-label">Correo:</label>
                <div className="col-sm-10">
                    <input type="email" id="correo" value={usuario.correo} disabled={!editMode} className="form-control" />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="verificado" className="col-sm-2 col-form-label">Verificado:</label>
                <div className="col-sm-10">
                    <input type="checkbox" id="verificado" checked={usuario.verified} disabled={!editMode} />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="fecha_creacion" className="col-sm-2 col-form-label">Fecha de creación:</label>
                <div className="col-sm-10">
                    <input type="date" id="fecha_creacion" value={formattedFechaCreacion} disabled={!editMode} className="form-control" />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="fecha_eliminacion" className="col-sm-2 col-form-label">Fecha de eliminación:</label>
                <div className="col-sm-10">
                    <input type="date" id="fecha_eliminacion" value={formattedFechaEliminacion} disabled={!editMode} className="form-control" />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="quien_elimino" className="col-sm-2 col-form-label">Quién eliminó:</label>
                <div className="col-sm-10">
                    <input type="text" id="quien_elimino" value={usuario.quien_elimino} disabled={!editMode} className="form-control" />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="fecha_actualizacion" className="col-sm-2 col-form-label">Fecha de actualización:</label>
                <div className="col-sm-10">
                    <input type="date" id="fecha_actualizacion" value={formattedFechaActualizacion} disabled={!editMode} className="form-control" />
                </div>
            </div>

            <div className="form-group row">
            <label htmlFor="quien_actualizo" className="col-sm-2 col-form-label">Quién actualizó:</label>
            <div className="col-sm-10">
                <input type="text" id="quien_actualizo" value={usuario.quien_actualizo} disabled={!editMode} className="form-control" />
            </div>
        </div>

            <div className="d-flex justify-content-between mt-3">
                <Link to="/lista" className="btn btn-link">
                    <button className="btn btn-primary">Volver</button>
                </Link>

                <div>
                    {editMode ? (
                        <button className="btn btn-primary btn-sm" onClick={handleDisableAccount}>
                            Deshabilitar cuenta
                        </button>
                    ) : (
                        <>
                            <button className="btn btn-primary btn-sm mr-2" onClick={handleEdit}>
                                Editar
                            </button>
                            <button className="btn btn-primary btn-sm" onClick={handleDisableAccount}>
                                Deshabilitar cuenta
                            </button>
                        </>
                    )}

                    {editMode && (
                        <>
                            <button className="btn btn-primary btn-sm mr-2">Guardar</button>
                            <button className="btn btn-primary btn-sm" onClick={handleEnableAccount}>
                                Habilitar cuenta
                            </button>
                        </>
                    )}
                </div>
            </div>

        </div>
);
};

    export default DetalleUsuario;
