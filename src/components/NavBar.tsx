import React from 'react';
import { Link } from 'react-router-dom';
import { baseComponentStyle } from './utils/styles';

const NavBar = () => {
    const linkStyle = {
        paddingRight: '9px',
    };

    const baseWithInline = {
        ...baseComponentStyle,
        "display": "inline"
    };

    return (
        <div style={baseWithInline}>
            <Link to='/' style={linkStyle}>Home</Link>
            <Link to='/notes' style={linkStyle}>Notes</Link>
            <Link to='/user' style={linkStyle}>User</Link>
            <Link to='/about' style={linkStyle}>About</Link>
        </div>
    );
};

export default NavBar;