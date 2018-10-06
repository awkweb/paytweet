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

        const username = api
            .getUserInfo(props.match.params.creatorUsername)
            .then(response => {
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
        }
    }

    handleSignIn = user => {
        this.setState({
            signedIn: true,
        })
    }

    handleCardPayment = ev => {
        ev.preventDefault()
        this.props.stripe
            .createSource({ type: 'card' })
            .then(({ source, error }) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('card source', source)
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

    handleCardPayment = ev => {
        ev.preventDefault()
        this.props.stripe
            .createSource({ type: 'card' })
            .then(({ source, error }) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('card source', source)
                    api.subscribe({
                        source: source.id,
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
                <h1>Subscribe to {username}</h1>
                <img src={profileImageUrl} />
                <div>{user.description}</div>
                <div>followers: {user.followers_count}</div>
                <p>$5/mo</p>
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
            return <div>loading...</div>
        }

        let stepMarkup
        if (!this.state.signedIn) {
            stepMarkup = <SignIn onSignIn={this.handleSignIn} />
        } else {
            stepMarkup = (
                <div>
                    {this.state.canMakePayment ? (
                        <div>
                            <PaymentRequestButtonElement />
                            <p>Or, fill in details below:</p>
                        </div>
                    ) : null}
                    <form onSubmit={this.handleCardPayment}>
                        <CardElement />
                        <button type="submit">Subscribe Now</button>
                    </form>
                </div>
            )
        }

        return (
            <div>
                {this.renderUserInfo()}
                {stepMarkup}
            </div>
        )
    }
}

export default injectStripe(SubscribePage)
