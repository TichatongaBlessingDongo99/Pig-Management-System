import React, { useEffect, useState } from 'react';
import { fetchPigs } from '../../utils/api';

const Pigs = () => {
    const [pigs, setPigs] = useState([]);

    useEffect(() => {
        const getPigs = async () => {
            const data = await fetchPigs();
            setPigs(data);
        };
        getPigs();
    }, []);

    return (
        <div>
            <h1>Pigs</h1>
            <ul>
                {pigs.map((pig) => (
                    <li key={pig.id}>{pig.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Pigs;
