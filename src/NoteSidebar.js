import React from 'react';
import UserContext from './UserContext';
import { withRouter} from 'react-router-dom'


function NoteSidebar(props) {
    return (
        <UserContext.Consumer>
            {value => {
                const currentNote = value.notes.find(note => note.id === props.match.params.noteId)

                const currentFolder = value.folders.find(folder => folder.id === currentNote.folderId)
            
                return (
                    <section className="group-column item">
        
                        <h2>Folder: {currentFolder.name}</h2>
                    </section>
                )
            }}
        </UserContext.Consumer>
    )
}

export default withRouter(NoteSidebar);