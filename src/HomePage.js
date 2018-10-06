import React from 'react'
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h3>Build a subscription for your Twitter</h3>
                <p>
                    Have subscribers pay you monthly for access to your tweets
                    in two minutes.
                    <Link to={`/creator`}>Let's go!</Link>
                </p>
            </div>
        )
    }
}

export default HomePage
