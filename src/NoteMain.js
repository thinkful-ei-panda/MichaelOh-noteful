import React from 'react';
import { withRouter } from 'react-router-dom'
import UserContext from './UserContext';



function NoteMain(props) {
    const deleteNoteRequest = (noteId, callback) => {
        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })
            .then(data => {callback(noteId)})
            .then(props.history.push('/'))
            .catch(error => {
                console.error(error)
            })
    }
    

    return (
        <UserContext.Consumer>
            {value => {
                const currentNote = value.notes.find(note => note.id === props.match.params.noteId)
                return (
                    <section className="group-column item-double">
                        <section>
                            <div className="border group-column note-margin note-padding width">
                                <h2>{currentNote.name}</h2>
                                <div className="group-row note-group-row">
                                    <p>Date modified on: {currentNote.modified}</p>
                                    <button onClick={() => deleteNoteRequest(currentNote.id, value.deleteNote)}>Delete Note</button>
                                    
                                </div>
                            </div>
                            <p className="note-margin width">{currentNote.content}</p>
                        </section>
                    </section>
                )
            }}
        </UserContext.Consumer>
    )
};



export default withRouter(NoteMain);