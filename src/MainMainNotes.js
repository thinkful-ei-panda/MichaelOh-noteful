import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import propTypes from 'prop-types'

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

MainMainNotes.propTypes = {
    props: propTypes.func.isRequired
}

export default MainMainNotes;
