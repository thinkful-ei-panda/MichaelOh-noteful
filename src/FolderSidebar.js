import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import UserContext from './UserContext';

class FolderSidebar extends React.Component {
    static contextType = UserContext;
    folders = this.context.folders.map(folder => 
        <li key={folder.id}><NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink></li>
    )

    render () {
        return (
            <section className="group-column">
                <ul>
                    {this.folders}
                    <li><NavLink to='/'>Add Folder</NavLink></li>
                </ul>
                
            </section>
        );
    };
};

export default  withRouter(FolderSidebar);