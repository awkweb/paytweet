import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import api from './api'

class App extends Component {
    onClickSubscribe = () => {
        api.subscribe({ username: 'tomfme' })
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="App">
                <button onClick={this.onClickSubscribe}>subscribe</button>
            </div>
        )
    }
}

export default App
