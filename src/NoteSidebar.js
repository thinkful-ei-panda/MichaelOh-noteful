import React from 'react';
import UserContext from './UserContext';
import { withRouter} from 'react-router-dom'
import propTypes from 'prop-types'

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

NoteSidebar.propTypes = {
    props: propTypes.object.isRequired
}
export default withRouter(NoteSidebar);