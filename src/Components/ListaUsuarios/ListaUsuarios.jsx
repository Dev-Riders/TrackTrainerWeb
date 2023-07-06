import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import './ListaUsuarios.css';
import {Link} from "react-router-dom";

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`http://localhost:25513/api/administrador/usuarios?page=${page}&size=${perPage}`, {
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Datos de la respuesta:', data);

                    if (data.usuarios && Array.isArray(data.usuarios)) {
                        const formattedUsuarios = data.usuarios.map(usuario => {
                            const fechaCreacion = moment(usuario.fechaCreacion).format('DD/MM/YYYY');
                            return { ...usuario, fechaCreacion };
                        });
                        setUsuarios(formattedUsuarios);
                        setTotalPages(data.totalPages);
                    } else {
                        console.error('La respuesta de la API no contiene un array válido de usuarios.');
                    }
                } else {
                    console.error('Error al obtener la lista de usuarios:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener la lista de usuarios:', error.message);
            }
            setLoading(false);
        };

        fetchUsuarios();
    }, [page, perPage]);

    const nextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 0));
    };

    const handleGoToPage = (pageNum) => {
        setPage(pageNum);
    };

    let pagesToShow = [];
    for (let i = Math.max(page - 2, 0); i <= Math.min(page + 2, totalPages - 1); i++) {
        pagesToShow.push(i);
    }

    return (
        <div className="tabla-usuarios">
            <h2>Lista de usuarios</h2>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <label>Elementos por página: </label>
                        <select
                            className="form-select form-select-sm mt-3"
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(parseInt(e.target.value));
                                setPage(0); // Restablecer la página al cambiar el tamaño de la página
                            }}
                            style={{ width: '100px' }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    <table className="table">
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Nickname</th>
                            <th>Correo</th>
                            <th>Verificado</th>
                            <th>Fecha de Creación</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={index}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.nickname}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.verified ? 'Si' : 'No'}</td>
                                <td>{usuario.fechaCreacion}</td>
                                <td>
                                    <Link to={`/usuario/${usuario.id}`}>
                                        <button className="btn btn-primary">Detalles</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="lista-usuarios-container">
                        <div>
                            <button onClick={prevPage} disabled={page === 0} className="btn btn-primary">
                                Anterior
                            </button>
                        </div>
                        {page > 2 && pagesToShow[0] !== 0 && (
                            <div>
                                <button onClick={() => setPage(0)} className="btn btn-primary">
                                    1
                                </button>
                            </div>
                        )}
                        {pagesToShow.map((pageNum) => (
                            <div key={pageNum}>
                                <button
                                    onClick={() => handleGoToPage(pageNum)}
                                    className={`btn btn-primary ${pageNum === page ? 'pagination-button-current' : 'pagination-button'}`}
                                >
                                    {pageNum + 1}
                                </button>
                            </div>
                        ))}
                        {page < totalPages - 2 && pagesToShow[pagesToShow.length - 1] !== totalPages - 1 && (
                            <div>
                                <button onClick={() => setPage(totalPages - 1)} className="btn btn-primary">
                                    {totalPages}
                                </button>
                            </div>
                        )}
                        <div>
                            <button onClick={nextPage} disabled={page + 1 === totalPages} className="btn btn-primary">
                                Siguiente
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ListaUsuarios;
