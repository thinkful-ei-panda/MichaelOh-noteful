import React, { Component } from 'react'
import UserContext from './UserContext'
import { withRouter } from 'react-router-dom'

class AddNote extends Component{
    state = {
        name: "",
        noteContent: "",
        folderId: "",
        error: ""
    }
    static contextType = UserContext;

    validateNoteName = (name) => {
        if(!name) {
            const error = 'Note name must not be empty!';
            this.setState({error})
        } else if (name.length < 3) {
            const error= 'why you do dis'
            this.setState({error})
        } else {
            this.setState({
                name: name,
                error: null
            })
        }
        
    }

    validateContent = (content) => {
        if(!content) {
            const error = 'Note content must not be empty!';
            this.setState({error})
        } else {
        return this.setState({
            noteContent: content,
            error: null
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const newNote = {
            name: this.validateNoteName(this.state.name),
            noteContent: this.validateContent(this.state.noteContent),
            folderId: this.state.folderId,
            modified: new Date(),
        }
        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote)
        })
            .then(res => {
                if(!res.ok)
                    return res.json().then(e => Promise.reject(e))
                    return res.json()
            })
            .then(note => {
                this.context.addNote(note)
                this.props.history.push('/')
            })
            .catch(error => {
                console.error({error})
            })
    }

    render() {
        return (
            <form className="addNote" onSubmit={this.handleSubmit}>
                <h2>Create a note</h2>
                <label htmlFor="note-name-input">
                    Name
                </label>
                <input type="text" id="note-name-input" name="note-name" value={this.state.name} onChange = {(e) => this.setState({name: this.validateNoteName(e.target.value)})}></input>
                <label htmlFor="note-content-input">
                    Content
                </label>
                <textarea id="note-content-input" name="note-content" value={this.state.noteContent} onChange={(e) => this.setState({noteContent: this.validateContent(e.target.value)})}></textarea>
                <label htmlFor="note-folder-option">
                    Folder
                </label>
                <select id="note-folder-option" name="note-folder" value={this.state.folderId} onChange={(e) => this.setState({folderId: e.target.value})}>
                    <option value={null}>...</option>
                    {this.context.folders.map(folder =>
                        <option key={folder.id} value={folder.id}>
                            {folder.name}
                        </option>)}
                </select>
                <button type="submit">
                    Add Note
                </button>
                {this.state.error ? <p>{this.state.error}</p>: ''}
            </form>
        )
    }
}

export default withRouter(AddNote);

