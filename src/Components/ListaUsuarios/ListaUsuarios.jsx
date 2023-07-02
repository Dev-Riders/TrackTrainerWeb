import React, { useEffect, useState } from 'react';
import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';
import moment from 'moment';
import 'moment/locale/es';
import './ListaUsuarios.css';

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUsuarios = async () => {
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
        };

        fetchUsuarios();
    }, [page, perPage]);

    const nextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 0));
    };

    const goToFirstPage = () => {
        setPage(0);
    };

    const goToLastPage = () => {
        setPage(totalPages - 1);
    };

    const handleGoToPage = (pageNum) => {
        setPage(pageNum);
    };

    const gridData = usuarios.map(usuario => [
        usuario.nombre,
        usuario.apellido,
        usuario.nickname,
        usuario.correo,
        usuario.verified ? 'Si' : 'No',
        usuario.fechaCreacion,
    ]);

    // Crear un array de números para las páginas a mostrar
    let pagesToShow = [];
    for (let i = Math.max(page - 2, 0); i <= Math.min(page + 2, totalPages - 1); i++) {
        pagesToShow.push(i);
    }

    return (
        <div>
            <h2>Lista de usuarios</h2>

            <div>
                <label>Elementos por página: </label>
                <select
                    value={perPage}
                    onChange={(e) => {
                        setPerPage(parseInt(e.target.value));
                        setPage(0); // Restablecer la página al cambiar el tamaño de la página
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <Grid
                data={gridData}
                columns={['Nombre', 'Apellido', 'Nickname', 'Correo', 'Verificado', 'Fecha de Creación']}
                pagination={false} // Desactivar la paginación del lado del cliente
                search={true}
                sort={true}
                resizable={true}
                className={{
                    paginationButton: 'pagination-button',
                    paginationButtonNext: 'pagination-button-next',
                    paginationButtonPrev: 'pagination-button-prev',
                    paginationButtonCurrent: 'pagination-button-current',
                }}
            />

            <div className="lista-usuarios-container">
                <div>
                <button onClick={prevPage} disabled={page === 0}>
                    Anterior
                </button>
                </div>
                {page > 1 && (
                    <>
                    <div>
                        <button onClick={goToFirstPage}>
                            1
                        </button>
                    </div>
                        {page > 2 && (
                            <span className="pagination-dots">...</span>
                        )}
                    </>
                )}
                {pagesToShow.map((pageNum) => (
                    <div>
                    <button
                        key={pageNum}
                        onClick={() => handleGoToPage(pageNum)}
                        className={pageNum === page ? 'pagination-button-current' : 'pagination-button'}
                    >
                        {pageNum + 1}
                    </button>
                    </div>
                ))}
                {page < totalPages - 3 && (
                    <span className="pagination-dots">...</span>
                )}
                {page < totalPages - 1 && ( // Verificar si estás en una página distinta de la última o la penúltima
                    <>
                        <div>
                        <button onClick={goToLastPage}>
                            {totalPages}
                        </button>
                        </div>
                    </>
                )}
                <div>
                <button onClick={nextPage} disabled={page + 1 === totalPages}>
                    Siguiente
                </button>
                </div>
            </div>
        </div>
    );
};

export default ListaUsuarios;
