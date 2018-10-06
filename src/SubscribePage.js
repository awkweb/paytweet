import React from 'react'
import firebase from './setupFirebase'
import {
    injectStripe,
    PaymentRequestButtonElement,
    CardElement,
} from 'react-stripe-elements'

import SignIn from './SignIn'
import api from './api'

class SubscribePage extends React.Component {
    constructor(props) {
        super(props)

        api.getUserInfo(props.match.params.creatorUsername).then(response => {
            this.setState({ user: response })
        })

        const paymentRequest = props.stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: `Follow @${this.props.match.params.creatorUsername}`,
                amount: 5000,
            },
        })

        paymentRequest.on('source', this.handlePaymentRequestPayment)

        paymentRequest.canMakePayment().then(result => {
            this.setState({ canMakePayment: !!result })
        })

        this.state = {
            signedIn: false,
            subscriptionSucceeded: false,
            canMakePayment: false,
            paymentRequest,
            loading: false,
        }
    }

    handleSignIn = user => {
        this.setState({
            signedIn: true,
        })
    }

    handleCardPayment = ev => {
        ev.preventDefault()
        this.setState({ loading: true })
        this.props.stripe
            .createSource({ type: 'card' })
            .then(({ source, error }) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('card source', source)
                    this.setState({
                        subscriptionSucceeded: true,
                    })
                    api.subscribe({
                        source: source.id,
                        subscriber: firebase.auth().currentUser.uid,
                        creator: this.props.match.params.creatorUsername,
                    }).then(response => {
                        this.setState({
                            subscriptionSucceeded: true,
                        })
                    })
                }
            })
    }

    handlePaymentRequestPayment = paymentResponse => {
        console.log(paymentResponse)

        api.subscribe({
            source: paymentResponse.source.id,
            creator: this.props.match.params.creatorUsername,
        }).then(response => {
            this.setState({
                subscriptionSucceeded: true,
            })
            paymentResponse.complete('success')
        })
    }

    renderUserInfo = () => {
        const { user } = this.state
        const profileImageUrl = user.profile_image_url.replace('_normal', '')
        const { match } = this.props
        const username = match.params.creatorUsername

        return (
            <div>
                <h1 className="sub__header">Subscribe to {username}</h1>
                <div className="sub__flex">
                    <img
                        className="sub__image"
                        alt="userimage"
                        src={profileImageUrl}
                    />
                    <p className="sub__info">
                        Join {user.followers_count} other subscribers for $5 per
                        month.
                        <br />
                        <br />
                        {user.description}
                    </p>
                </div>
            </div>
        )
    }

    render() {
        const { match } = this.props
        const username = match.params.creatorUsername

        if (!(username && username.length > 1 && username.startsWith('@'))) {
            return <div>404 Not Found</div>
        }

        if (!this.state.user) {
            return null
        }

        let stepMarkup
        if (!this.state.signedIn) {
            stepMarkup = <SignIn onSignIn={this.handleSignIn} />
        } else if (!this.state.subscriptionSucceeded) {
            stepMarkup = (
                <div>
                    {this.state.canMakePayment ? (
                        <div>
                            <PaymentRequestButtonElement
                                paymentRequest={this.state.paymentRequest}
                            />
                            <p>Or, fill in details below:</p>
                        </div>
                    ) : null}
                    <form onSubmit={this.handleCardPayment}>
                        <div className="sub__card">
                            <CardElement />
                        </div>
                        <button className="sub__button" type="submit">
                            {this.state.loading
                                ? 'Subscribing...'
                                : 'Subscribe Now'}
                        </button>
                    </form>
                </div>
            )
        } else {
            stepMarkup = (
                <div className="success">
                    Success! You can now access{' '}
                    <a href={`https://twitter.com/${username}`}>
                        {username}
                        's
                    </a>{' '}
                    private tweets.
                </div>
            )
        }

        return (
            <div className="subscriber">
                {this.renderUserInfo()}
                {stepMarkup}
            </div>
        )
    }
}

export default injectStripe(SubscribePage)
