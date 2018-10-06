import React from 'react'

import api from './api'

class HomePage extends React.Component {
    state = {
        message: '',
    }

    onClickSubscribe = async () => {
        try {
            const { message } = await api.subscribe({ username: 'tomfme' })
            this.setState({ message })
        } catch (e) {
            this.setState({ message: 'error' })
        }
    }

    render() {
        const { message } = this.state
        return (
            <div>
                <button onClick={this.onClickSubscribe}>subscribe</button>
                {message}
            </div>
        )
    }
}

export default HomePage
