import React from 'react'
import { Link } from 'react-router-dom'
import SignIn from './SignIn'
import goprivate from './images/goprivate.png'

class CreatorPage extends React.Component {
    state = {
        amount: 5,
        signedIn: false,
        step: 1,
        username: null,
    }

    handleSignIn = user => {
        console.log(user)
        this.setState({ signedIn: true, step: 2 })
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

    onClickFinish = () => {
        this.setState({ step: 4 })
    }

    render() {
        const { amount, step, username } = this.state
        let stepMarkup
        if (step === 1) {
            stepMarkup = (
                <div>
                    <h3>Step 1/3. Sign in with Twitter</h3>
                    <SignIn onSignIn={this.handleSignIn} />
                </div>
            )
        } else if (step === 2) {
            stepMarkup = (
                <div>
                    <h3>Step 2/3. Set an amount</h3>
                    <p>Choose a monthly amount to charge subscribers.</p>
                    <input
                        value={amount}
                        type="number"
                        onChange={this.onChangeAmount}
                    />
                    <button disabled={!amount} onClick={this.onClickSetAmount}>
                        Continue
                    </button>
                </div>
            )
        } else if (step === 3) {
            stepMarkup = (
                <div>
                    <h3>Step 3/3. Go private</h3>
                    <p>
                        Make your account private so only subscribers have
                        access by{' '}
                        <a
                            href="https://twitter.com/settings/safety"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            selecting "Protect Your Tweets"
                        </a>
                        .
                    </p>

                    <img alt="goprivate" src={goprivate} />

                    <p>Once you've done that come back and select Finish</p>
                    <button onClick={this.onClickGoBack}>Back</button>
                    <button onClick={this.onClickFinish}>Finish</button>
                </div>
            )
        } else {
            stepMarkup = (
                <div>
                    <h3>Congrats!</h3>
                    <p>You can now make money from your tweets!</p>
                    <p>
                        Here's your unique subscription link:
                        <Link to={`/${username}`}>
                            https://paytweetb.firebaseapp.com/@
                            {username}
                        </Link>
                    </p>
                </div>
            )
        }

        return <div>{stepMarkup}</div>
    }
}

export default CreatorPage
