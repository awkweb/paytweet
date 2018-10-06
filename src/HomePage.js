import React from "react";

import api from "./api";

class HomePage extends React.Component {
  onClickSubscribe = () => {
    api
      .subscribe({ username: "tomfme" })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        <button onClick={this.onClickSubscribe}>subscribe</button>
      </div>
    );
  }
}

export default HomePage;
