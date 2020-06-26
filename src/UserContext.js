import React from 'react';
// import STORE from './store'

const UserContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
  })

export default UserContext;