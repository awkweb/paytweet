import React from 'react'
import { Link } from 'react-router-dom'
import SignIn from './SignIn'
// import api from './api'
import goprivate from './images/goprivate.png'

class CreatorPage extends React.Component {
    state = {
        amount: 5,
        signedIn: false,
        step: 1,
        username: null,
    }

    handleSignIn = username => {
        this.setState({ signedIn: true, step: 2, username })
    }

    onChangeAmount = e => {
        this.setState({ amount: e.target.value })
    }

    onClickSetAmount = () => {
        this.setState({ step: 3 })
    }

    onClickGoBack = () => {
        const { step } = this.state
        this.setState({ step: step - 1 })
    }

    onClickFinish = async () => {
        // const { username } = this.state
        // const res = await api.createPlan({ username })
        this.setState({ step: 4 })
    }

    render() {
        const { amount, step, username } = this.state
        let stepMarkup
        if (step === 1) {
            stepMarkup = (
                <div className="creator__container">
                    <div className="meter">
                        <div
                            className="meter__progress"
                            style={{ width: '0%' }}
                        />
                    </div>
                    <h3 className="step__header">
                        Step 1/3: Create an account
                    </h3>
                    <p className="step__info">
                        Sign in with Twitter so we can do all the heavy-lifting.
                    </p>
                    <SignIn
                        onSignIn={this.handleSignIn}
                        getUsername={this.handleGetUsername}
                    />
                </div>
            )
        } else if (step === 2) {
            stepMarkup = (
                <div className="creator__container">
                    <div className="meter">
                        <div
                            className="meter__progress"
                            style={{ width: '33.3%' }}
                        />
                    </div>
                    <h3 className="step__header">Step 2/3: Set an amount</h3>
                    <p className="step__info">
                        Choose a monthly amount to charge subscribers.
                    </p>
                    <input
                        className="step__input"
                        value={amount}
                        type="number"
                        onChange={this.onChangeAmount}
                    />
                    <button
                        className="creator__button"
                        disabled={!amount}
                        onClick={this.onClickSetAmount}
                    >
                        Continue
                    </button>
                </div>
            )
        } else if (step === 3) {
            stepMarkup = (
                <div className="creator__container">
                    <div className="meter">
                        <div
                            className="meter__progress"
                            style={{ width: '66.6%' }}
                        />
                    </div>
                    <h3 className="step__header">Step 3/3: Go private</h3>
                    <p className="step__info">
                        Make your account private so only subscribers have
                        access by{' '}
                        <a
                            href="https://twitter.com/settings/safety"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            selecting Protect Your Tweets
                        </a>
                        .<br />
                        <br />
                        Once you've done that come back and select Finish.
                    </p>

                    <img className="image" alt="goprivate" src={goprivate} />

                    <button
                        className="creator__button"
                        disabled={!amount}
                        onClick={this.onClickFinish}
                    >
                        Finish
                    </button>
                </div>
            )
        } else {
            stepMarkup = (
                <div>
                    <div className="meter">
                        <div
                            className="meter__progress"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <h3 className="step__header">Congrats!</h3>
                    <p className="step__info">
                        You can now make money from your tweets! <br />
                        <br />
                        Here's your unique subscription link:{' '}
                        <Link to={`/${username}`} className="dark">
                            https://paytweetb.firebaseapp.com/@
                            {username}
                        </Link>
                    </p>
                </div>
            )
        }

        return <div className="creator">{stepMarkup}</div>
    }
}

export default CreatorPage
