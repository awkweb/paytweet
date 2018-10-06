import React from 'react'
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
    render() {
        return (
            <div className="home">
                <h1 className="home__header">
                    Build a subscription for your Twitter
                </h1>
                <p className="home__description">
                    Have subscribers pay you monthly for access to your tweets
                    in two minutes.
                </p>
                <Link to={`/creator`} className="home__button">
                    Let's go!
                </Link>
            </div>
        )
    }
}

export default HomePage
