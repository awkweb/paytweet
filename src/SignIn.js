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
            signInSuccessWithAuthResult: authResult => {
                const {
                    user: { uid },
                    additionalUserInfo,
                    credential,
                } = authResult
                this.props.onSignIn(additionalUserInfo.profile.screen_name)
                firebase
                    .database()
                    .ref(`users/${uid}`)
                    .set({
                        additionalUserInfo,
                        credential,
                    })
                return false
            },
        },
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged(user => {
                this.setState({ signedIn: !!user })
                if (user) {
                    firebase
                        .database()
                        .ref(`users/${user.uid}`)
                        .once('value')
                        .then(snapshot => {
                            this.props.onSignIn(
                                snapshot.val().additionalUserInfo.profile
                                    .screen_name,
                            )
                        })
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
