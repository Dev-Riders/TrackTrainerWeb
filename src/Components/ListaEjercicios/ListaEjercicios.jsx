import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListaEjercicios = () => {
    const [ejercicios, setEjercicios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEjercicios = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:25513/api/ejercicios/find-all-ejercicios');
                const data = await response.json();
                console.log(data);  // Agrega esto para inspeccionar la respuesta
                setEjercicios(data);
            } catch (error) {
                console.error('Error al cargar los ejercicios:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEjercicios();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="tabla-ejercicios text-light">
            <h2>Lista de Ejercicios</h2>
            {ejercicios.length === 0 ? (
                <p>No hay ejercicios disponibles.</p>
            ) : (
                <table className="table table-striped table-hover table-bordered table-dark">
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ejercicios.map((ejercicio) => (
                        <tr key={ejercicio.idEjercicio}>
                            <td>{ejercicio.nombreEjercicio}</td>
                            <td>
                                <Link to={`/editar-ejercicio/${ejercicio.idEjercicio}`} className="btn-detalles text-decoration-none">
                                    <button className="btn">Editar</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListaEjercicios;
