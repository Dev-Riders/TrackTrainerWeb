import React, { useEffect, useState } from 'react';
import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';
import moment from 'moment';
import 'moment/locale/es';

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:25513/api/usuario', {
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Datos de la respuesta:', data);

                    if (Array.isArray(data)) {
                        const formattedUsuarios = data.map(usuario => {
                            const fechaCreacion = moment(usuario.fechaCreacion).format('DD/MM/YYYY');
                            return { ...usuario, fechaCreacion };
                        });
                        setUsuarios(formattedUsuarios);
                    } else {
                        console.error('La respuesta de la API no es un array válido de usuarios.');
                    }
                } else {
                    console.error('Error al obtener la lista de usuarios:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener la lista de usuarios:', error.message);
            }
        };

        fetchUsuarios();
    }, []);

    const gridData = usuarios.map(usuario => [
        usuario.nombre,
        usuario.apellido,
        usuario.nickname,
        usuario.correo,
        usuario.verified ? 'Si' : 'No',
        usuario.admin ? 'Si' : 'No',
        usuario.fechaCreacion,
    ]);

    const paginationButtonStyle = 'padding: 6px 10px; margin: 0 4px; color: #000;';

    return (
        <div>
            <h2>Lista de usuarios</h2>

            <div>
                <label>Elementos por página: </label>
                <select
                    value={perPage}
                    onChange={(e) => setPerPage(parseInt(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <Grid
                data={gridData}
                columns={['Nombre', 'Apellido', 'Nickname', 'Correo', 'Verificado', 'Administrador', 'Fecha de Creación']}
                pagination={{
                    limit: perPage,
                    className: 'pagination-container',
                }}
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
            <style>
                {`
          .gridjs-pages {
            display: flex;
            justify-content: center;
            margin-top: 10px;
          }
          .pagination-button {
            ${paginationButtonStyle}
          }
          .pagination-button-next {
            ${paginationButtonStyle}
          }
          .pagination-button-prev {
            ${paginationButtonStyle}
          }
          .pagination-button-current {
            ${paginationButtonStyle}
            font-weight: bold;
          }
        `}
            </style>
        </div>
    );
};

export default ListaUsuarios;
