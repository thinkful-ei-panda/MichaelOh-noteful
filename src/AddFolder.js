import React, { Component } from 'react'
import UserContext from './UserContext'
import {withRouter} from 'react-router-dom'

 class AddFolder extends Component {
    
    state = {
        name: "",
        error: null
    }

    static contextType = UserContext;


    handleSubmit = e => {
        e.preventDefault();
        if(this.state.name){
            const folder = {
                name: this.state.name
            }
            fetch(`http://localhost:9090/folders`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(folder),
            })
                .then(res => {
                    if(!res.ok)
                        return res.json().then(e => Promise.reject(e))
                        return  res.json()
                })
                .then(res => {
                    this.context.addFolder(res)
                    this.props.history.push('/')
                })
                .catch(error => {
                    console.error({error})
                })
        } else {
            const error = 'Folder name must not be empty!';
            this.setState({error})
        }
        
    }

    render () {

        return (
            <form className='addFolder' onSubmit={this.handleSubmit}>
                <h2>Create a Folder</h2>
                <label htmlFor='folder-name-input'>
                    Name
                </label>
                <input type='text' onChange={(e) => this.setState({name: e.target.value})} name='folder-name-input' id='folderName'>
                </input>
                <button type='submit'>
                    Add Folder
                </button>
                {this.state.error && <p>{this.state.error}</p>}
            </form>

        )
    }
}
export default withRouter(AddFolder);