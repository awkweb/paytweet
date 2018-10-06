import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signedIn: false,
        }
    }

    // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Twitter as auth provider.
        signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false,
        },
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged(user => {
                this.setState({ signedIn: !!user })
                if (user) {
                    this.props.onSignIn && this.props.onSignIn(user)
                } else {
                    this.props.onSignOut && this.props.onSignOut()
                }
            })
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver()
    }

    render() {
        return (
            <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
            />
        )
    }
}

export default SignIn
