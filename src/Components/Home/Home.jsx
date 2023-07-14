import React from 'react';
import './Home.css';
import { Card } from 'react-bootstrap';

const Home = () => {

    return (
        <div id="home" className="container py-3">
            <h1 className="text-center mb-4">Bienvenido a nuestra aplicación de seguimiento de ejercicios</h1>

            <Card style={{ backgroundColor: 'transparent', color: 'white' }} className="mb-3">
                <Card.Body className="text-bg-dark">
                    <Card.Header className="text-center"><p className="lead">
                        Nuestra aplicación está diseñada para ayudarte a mantener un seguimiento consistente de tus rutinas de ejercicios y tu progreso físico.
                    </p></Card.Header>
                    <Card.Title className="text-center">Características principales</Card.Title>
                    <Card.Text className="text-center">
                        1. Registro detallado de tus rutinas de ejercicio <br/>
                        2. Estadísticas de seguimiento de tu progreso <br/>
                        3. Recomendaciones personalizadas basadas en tus patrones de ejercicio <br/>
                        4. Comunidad motivadora para ayudarte a mantenerte en el camino
                    </Card.Text>
                </Card.Body>
            </Card>

            <div className="text-center mt-3">
                <h3>¡Comienza a hacer ejercicio ahora!</h3>
            </div>
        </div>
    );
};

export default Home;
