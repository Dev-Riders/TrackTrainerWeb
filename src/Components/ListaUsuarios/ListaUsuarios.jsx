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
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');

                let url = `http://localhost:25513/api/administrador/usuarios?page=${page}&size=${perPage}`;

                if (search) {
                    if (search.includes('@')) {
                        url += `&correo=${search}`;
                    } else {
                        url += `&nickname=${search}`;
                    }
                }

                const response = await fetch(url, {
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.ok) {
                    const data = await response.json();

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
    }, [page, perPage, search]);

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

    const handleClearSearch = () => {
        setSearch('');
    };

    return (
        <div className="tabla-usuarios text-light">
            <h2>Lista de usuarios</h2>

            <div className="d-flex align-items-center">
                <label className="mr-2">Buscar: </label>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-light opacity-75 mr-2"
                />
                <button onClick={handleClearSearch} className="btn btn-success btn-sm ml-2">
                    Borrar
                </button>
            </div>




            {loading ? (
                <div className="loading-container text-light">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden text-light">Cargando...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <label>Elementos por página: </label>
                        <select
                            className="form-select form-select-sm mt-3 mb-3"
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(parseInt(e.target.value));
                                setPage(0); // Reset page when changing page size
                            }}
                            style={{ width: '100px' }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    <table className="table table-striped table-hover table-bordered table-dark table-secondary
                    ">
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
                                    <Link to={`/usuario/${usuario.id}`} className="btn-detalles text-decoration-none">
                                        <button className="btn">Detalles</button>
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
