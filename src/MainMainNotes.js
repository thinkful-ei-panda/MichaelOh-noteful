import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';


function MainMainNotes() {
    return (
        <UserContext.Consumer>
            {value => {
                const notes = value.notes.map(note => {
                    return (
                        <section key={note.id}>
                            <h2><Link to={`/note/${note.id}`}>Name: {note.name}</Link></h2>
                            <div className="group-row note-group-row">
                                <p>Modified: {note.modified}</p>
                            </div>
                        </section>
                    )
                })
            
                return (
                    <section className="note-list"> 
                       {notes}
                    </section>
                );
            }}
        </UserContext.Consumer>
    )
};



export default MainMainNotes;
