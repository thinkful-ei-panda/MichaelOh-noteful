import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <h1><Link to='/'>Noteful</Link></h1>
            <p><Link to='/addNote'>Add Note</Link></p>
        </header>
    )
}

export default Header;