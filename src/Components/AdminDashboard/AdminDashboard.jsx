import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUsers, faChartLine, faPersonRunning} from '@fortawesome/free-solid-svg-icons';
import UserCountChart from '../GraficoContadorUsuarios';
import GraficoContadorSuscritos from '../GraficoContadorSuscritos';


const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => setOpen(!open);

    return (
        <div className="d-flex">
            <div ref={ref} className={`p-3 bg-light bg-opacity-75 border-right d-flex flex-column ${open ? 'align-items-end' : ''}`} style={{ minWidth: '75px' }} >
                {open ?
                    <FontAwesomeIcon icon={faTimes} onClick={toggleMenu} size="xs" className="position-absolute top-0 end-0 m-2 " />
                    :
                    <FontAwesomeIcon icon={faBars} onClick={toggleMenu} size="lg" className="align-self-start mb-3 cursor-pointer ms-2" />
                }
                <div id="menu-content" className="ms-2">
                    <Link to="/lista" className="d-flex align-items-center my-3 text-decoration-none pe-1 me-1">
                        <FontAwesomeIcon icon={faUsers} className="me-2" />
                        <span className={open ? '' : 'visually-hidden'}>Ver lista de usuarios</span>
                    </Link>
                    <Link to="/ejercicios" className="d-flex align-items-center my-3 text-decoration-none pe-1 me-1">
                        <FontAwesomeIcon icon={faPersonRunning} className="me-2" />
                        <span className={open ? '' : 'visually-hidden'}>Ejercicios</span>
                    </Link>
                </div>
            </div>

            <Container className="my-4 flex-grow-1 text-light">
                <h2>Panel de administrador</h2>

                <Row className="mt-4" >
                    <Col>
                        <Card className="d-flex justify-content-center bg-light bg-opacity-75">
                            <Card.Body>
                                <div className="d-flex justify-content-center bg-light bg-opacity-75" style={{ height: '300px' }}>
                                    <UserCountChart/>
                                </div>
                                <Card.Title className="mt-3 text-center">Linea de tiempo de Usuarios</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="d-flex justify-content-center bg-light bg-opacity-75">
                            <Card.Body>
                                <div className="d-flex justify-content-center bg-light bg-opacity-75" style={{ height: '300px' }}>
                                    <GraficoContadorSuscritos />
                                </div>
                                <Card.Title className="mt-3 text-center">Distribución de Usuarios Suscritos y No Suscritos</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="d-flex justify-content-center bg-light bg-opacity-75">
                            <Card.Body>
                                <div className="d-flex justify-content-center">
                                    <div className="p-5 border rounded-circle bg-light text-secondary">
                                        <FontAwesomeIcon icon={faChartLine} size="5x" />
                                    </div>
                                </div>
                                <Card.Title className="mt-3 text-center">Placeholder de gráfico</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default AdminDashboard;
