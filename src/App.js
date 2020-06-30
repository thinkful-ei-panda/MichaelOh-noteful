import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import STORE from './store'
import MainMainNotes from './MainMainNotes';
import MainSidebar from './MainSidebar';
import FolderNotes from './FolderNotes';
import FolderSidebar from './FolderSidebar';
import NoteMain from './NoteMain';
import NoteSidebar from './NoteSidebar'
import UserContext from './UserContext';
import Header from './Header'
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import ErrorBoundary from './ErrorBoundary';
import './App.css';


class App extends Component {
state = {
  notes: [],
  folders: []
}

deleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
}

componentDidMount() {
  Promise.all([
  fetch(`http://localhost:9090/notes`),
  fetch(`http://localhost:9090/folders`)
  ])
    .then(([notesRes, foldersRes]) => {
      if(!notesRes.ok) 
        return notesRes.json().then(e => Promise.reject(e));
      if(!foldersRes.ok) 
        return foldersRes.json().then(e => Promise.reject(e));
      return Promise.all([notesRes.json(), foldersRes.json()]);
    })
    .then(([notes, folders]) => {
      this.setState({
      notes, folders
    })})
    .catch(error => {
      console.error({error});
    });
}

handleAddFolder = folder => {
  this.setState({
    folders: [
      ...this.state.folders,
      folder
    ]
  })
}

handleAddNote = note => {
  this.setState({
    notes: [
      ...this.state.notes,
      note
    ]
  })
}


render() {
  const contextValue = {
    notes: this.state.notes,
    folders: this.state.folders,
    deleteNote: this.deleteNote,
    addFolder: this.handleAddFolder,
    addNote: this.handleAddNote
  }

  return (
    <div>
      <Header />
      <main>
        <div>
          <UserContext.Provider value={contextValue}>
          <ErrorBoundary>

          <Route exact path='/addFolder' component={MainSidebar}/>

          <Route exact path='/addFolder' component={AddFolder}/>

          <Route exact path='/addNote' component={MainSidebar}/>

          <Route exact path='/addNote' component={AddNote}/>

          </ErrorBoundary>

          <ErrorBoundary>
        
          <Route exact path='/' component={MainSidebar}/>

          <Route exact path='/folder/:folderId' component={FolderSidebar}/>

          <Route exact path='/note/:noteId' component={NoteSidebar}/>

          </ErrorBoundary>

          <ErrorBoundary>

          <Route exact path='/'  component={MainMainNotes}/>

          <Route exact path='/folder/:folderId' component={FolderNotes} />

          <Route exact path='/note/:noteId' component={NoteMain} />

          </ErrorBoundary>

        </UserContext.Provider>
        </div>
      </main>
    </div>
  )
}
}

export default App;