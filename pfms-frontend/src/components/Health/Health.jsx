import React, { useEffect, useState } from 'react';
import { fetchHealthRecords } from '../../utils/api';

const Health = () => {
    const [healthRecords, setHealthRecords] = useState([]);

    useEffect(() => {
        const getHealthRecords = async () => {
            const data = await fetchHealthRecords();
            setHealthRecords(data);
        };
        getHealthRecords();
    }, []);

    return (
        <div>
            <h1>Health Records</h1>
            <ul>
                {healthRecords.map((record) => (
                    <li key={record.id}>{record.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default Health;
