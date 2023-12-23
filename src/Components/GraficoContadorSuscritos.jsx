import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GraficoContadorSuscritos = () => {
    const [suscritosData, setSuscritosData] = useState([]);

    useEffect(() => {
        const fetchSuscritos = async () => {
            try {
                const response = await fetch('http://localhost:25513/api/usuario/count-subscriptions');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // Suponiendo que el endpoint devuelva un objeto como { suscritos: number, noSuscritos: number }
                setSuscritosData([
                    { name: 'Suscritos', count: data.suscritos },
                    { name: 'No Suscritos', count: data.noSuscritos }
                ]);
            } catch (error) {
                console.error('Error fetching suscritos data:', error);
            }
        };

        fetchSuscritos();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={suscritosData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" name="Usuarios" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default GraficoContadorSuscritos;
