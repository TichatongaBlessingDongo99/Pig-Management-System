import React, { useEffect, useState } from 'react';
import { fetchFarms } from '../../utils/api';

const Farms = () => {
    const [farms, setFarms] = useState([]);

    useEffect(() => {
        const getFarms = async () => {
            const data = await fetchFarms();
            setFarms(data);
        };
        getFarms();
    }, []);

    return (
        <div>
            <h1>Farms</h1>
            <ul>
                {farms.map((farm) => (
                    <li key={farm.id}>{farm.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Farms;
