const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const cors = require("cors")({
  origin: process.env.NODE_ENV === "production" ? true : "*"
});
const Twitter = require("twitter");
const { twitterKey, twitterSecret } = functions.config().twitter;
const { stripeKey } = functions.config().stripe;

exports.getUserInfo = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const {
      query: { username }
    } = request;

    admin
      .database()
      .ref("users/")
      .once("value", snapshot => {
        const users = snapshot.val();
        let userInfo;
        Object.keys(users).some(key => {
          const user = users[key].additionalUserInfo.profile;
          if (`@${user.screen_name}` === username) {
            userInfo = user;
          }
        });
        response.status(200).send(userInfo);
      });
  });
});

exports.createPlan = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    response.status(200).send({
      message: "Hello from Firebase!"
    });
  });
});

const follow = (subscriberId, creatorUsername) => {
  return new Promise((resolve, reject) => {
    const subscriberUser = admin.database().ref(`users/${subscriberId}`);
    subscriberUser.once("value", snapshot => {
      const value = snapshot.val();

      const subscriberClient = new Twitter({
        consumer_key: twitterKey,
        consumer_secret: twitterSecret,
        access_token_key: value.credential.accessToken,
        access_token_secret: value.credential.secret
      });

      // Create friendship
      subscriberClient
        .post("friendships/create", {
          user_id: creatorUsername
        })
        .then(response => {
          console.log(response);
          resolve(value.additionalInfo.username);
        })
        .catch(error => {
          console.log(error);
        });
    });
  });
};

const dm = (subscriberUsername, creatorUsername) => {
  return new Promise((resolve, reject) => {
    const botUser = admin.database().ref(`users/QJIx8y9VOeSMUQTubKwAxkuyhzE2`);
    botUser.once("value", snapshot => {
      const value = snapshot.value();

      const botClient = new Twitter({
        consumer_key: twitterKey,
        consumer_secret: twitterSecret,
        access_token_key: value.credential.accessToken,
        access_token_secret: value.credential.secret
      });

      // Send DM
      botClient
        .post("direct_messages/events/new", {
          event: {
            type: "message_create",
            message_create: {
              target: {
                recipient_id: creatorUsername
              },
              message_data: {
                text: `New subscriber! @${subscriberUsername} payed $5 to follow you. Click here to accept: https://twitter.com/follower_requests`
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  });
};

exports.subscribe = functions.https.onRequest((request, response) => {
  if (
    request.method === "GET" ||
    request.method === "PUT" ||
    request.method === "DELETE"
  ) {
    return response.status(403).send("Forbidden!");
  }
  return cors(request, response, () => {
    const {
      source,
      subscriber: subscriberId,
      creator: creatorUsername
    } = JSON.parse(request.body);

    follow(subscriberId, creatorUsername)
      .then(subscriberUsername => {
        return dm(subscriberUsername, creatorUsername);
      })
      .then(() => {
        response.status(200).send({
          message: "subscribe success!"
        });
      });
  });
});
