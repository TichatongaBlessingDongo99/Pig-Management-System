import React, { useEffect, useState } from 'react';
import { fetchFeedingLogs } from '../../utils/api';

const Feeding = () => {
    const [feedingLogs, setFeedingLogs] = useState([]);

    useEffect(() => {
        const getFeedingLogs = async () => {
            const data = await fetchFeedingLogs();
            setFeedingLogs(data);
        };
        getFeedingLogs();
    }, []);

    return (
        <div>
            <h1>Feeding Logs</h1>
            <ul>
                {feedingLogs.map((log) => (
                    <li key={log.id}>{log.details}</li>
                ))}
            </ul>
        </div>
    );
};

export default Feeding;
