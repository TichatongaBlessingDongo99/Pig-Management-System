import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/farms">Farms</Link></li>
                <li><Link to="/pigs">Pigs</Link></li>
                <li><Link to="/health">Health</Link></li>
                <li><Link to="/feeding">Feeding</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
