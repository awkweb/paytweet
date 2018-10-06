import React from "react";

const SubscribePage = ({ match }) => {
  const username = match.params.creatorUsername;
  if (!(username && username.length > 1 && username.startsWith("@"))) {
    return <div>404 Not Found</div>;
  }

  return <div>{`Subscribe to ${username}`}</div>;
};

export default SubscribePage;
