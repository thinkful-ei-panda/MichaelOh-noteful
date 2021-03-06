import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserContext from './UserContext';


function FolderNotes(props) {
    return (
        <UserContext.Consumer>
            {value => {
                const notes = value.notes.filter(note => note.folderId === props.match.params.folderId).map(note =>
                    (
                        <section  key={note.id}>
                            <h2><Link to={`/note/${note.id}`}>Name: {note.name}</Link></h2>
                            <div className="group-row note-group-row">
                                <p>Modified: {note.modified}</p>
                            </div>
                        </section>
                    )
                );
            
                return (
                    <section className="notesList"> 
                       {notes}
                    </section>
                );
            }}
        </UserContext.Consumer>
    )
};



export default withRouter(FolderNotes);