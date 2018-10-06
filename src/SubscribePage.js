import React from "react";
import SignIn from "./SignIn";

class SubscribePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false
    };
  }

  handleSignIn = user => {
    this.setState({
      signedIn: true
    });
  };

  render() {
    const { match } = this.props;
    const username = match.params.creatorUsername;

    if (!(username && username.length > 1 && username.startsWith("@"))) {
      return <div>404 Not Found</div>;
    }

    if (!this.state.signedIn) {
      return (
        <div>
          <h1>Subscribe to {username}</h1>
          <p>Sign in:</p>
          <SignIn onSignIn={this.handleSignIn} />
        </div>
      );
    }

    return (
      <div>
        <h1>Subscribe to {username}</h1>
        <button id="pay">Pay</button>
      </div>
    );
  }
}

export default SubscribePage;
