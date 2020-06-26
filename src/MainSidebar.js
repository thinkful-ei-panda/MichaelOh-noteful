import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import UserContext from './UserContext';

function MainSidebar (props) {
    return (
        <UserContext.Consumer>
            {value => {
                const folders = value.folders.map(folder => 
                    <li key={folder.id}><NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink></li>
                )
                
                return (
                    <section className="bfolder-list">
                        <ul>
                            {folders}
                            <li><NavLink to='/addFolder'>Add Folder</NavLink></li>
                        </ul>
                    </section>
                )
            }}          
        </UserContext.Consumer>
    );
};

export default withRouter(MainSidebar);