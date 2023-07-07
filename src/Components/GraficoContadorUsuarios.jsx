import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import 'moment/locale/es';

const GraficoContadorUsuarios = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:25513/api/administrador/todos`, {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const users = await response.json();
            const userData = users.reduce((data, user) => {
                const date = moment(user.fechaCreacion).format('DD-MM-YYYY');
                data[date] = (data[date] || 0) + 1;
                return data;
            }, {});
            const chartData = Object.entries(userData).map(([date, count]) => ({ date, count }));
            setUserData(chartData);
        };

        fetchUsers();
    }, []);

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={userData}>
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficoContadorUsuarios;
