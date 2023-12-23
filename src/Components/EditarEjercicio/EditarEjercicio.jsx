import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarEjercicio.css'; // Asegúrate de incluir este archivo CSS.

const EditarEjercicio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ejercicio, setEjercicio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEjercicio = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:25513/api/ejercicios/${id}/id-ejercicio`);
                if (!response.ok) {
                    throw new Error('No se pudo cargar el ejercicio');
                }
                const data = await response.json();
                setEjercicio(data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEjercicio();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const response = await fetch(`http://localhost:25513/api/ejercicios/${id}/update-ejercicio-by-id`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el ejercicio');
            }
            navigate('/ejercicios'); // Redirige a la lista de ejercicios tras la actualización.
        } catch (error) {
            console.error(error.message);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!ejercicio) {
        return <div>No se encontró el ejercicio.</div>;
    }

    return (
        <div className="editar-ejercicio-container">
            <h2>Editar Ejercicio</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <table className="table-editar-ejercicio">
                    <tbody>
                    <tr>
                        <th>Nombre:</th>
                        <td>
                            <input
                                type="text"
                                name="nombreEjercicio"
                                defaultValue={ejercicio.nombreEjercicio || ''}
                                required
                                className="form-control"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Descripción:</th>
                        <td>
                                <textarea
                                    name="descripcionEjercicio"
                                    defaultValue={ejercicio.descripcionEjercicio || ''}
                                    className="form-control"
                                />
                        </td>
                    </tr>
                    <tr>
                        <th>Imagen:</th>
                        <td>
                            {ejercicio.imagenEjercicio ? (
                                <img src={`http://localhost:25513${ejercicio.imagenEjercicio}`} alt="Imagen del Ejercicio" className="imagen-ejercicio" />
                            ) : (
                                <>
                                    <p>No hay imagen. Subir una nueva:</p>
                                    <input type="file" name="imagen" className="form-control-file" />
                                </>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Video:</th>
                        <td>
                            {ejercicio.videoEjercicio ? (
                                <video controls src={`http://localhost:25513${ejercicio.videoEjercicio}`} className="video-ejercicio" />
                            ) : (
                                <>
                                    <p>No hay video. Subir uno nuevo:</p>
                                    <input type="file" name="video" className="form-control-file" />
                                </>
                            )}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="submit" className="btn-actualizar">Actualizar Ejercicio</button>
            </form>
        </div>
    );
};

export default EditarEjercicio;
