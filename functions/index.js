const functions = require("firebase-functions");
const cors = require("cors")({
  origin: process.env.NODE_ENV === "production" ? "true" : "*"
});

exports.createPlan = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    response.status(200).send({
      message: "Hello from Firebase!"
    });
  });
});

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
    } = request.body;

    const { twitterKey, twitterSecret } = functions.config().twitter;
    const { stripeKey } = functions.config().stripe;

    // TODO: Make subscription

    // Create friendship

    // Send DM to creator

    response.status(200).send({
      message: "subscribe success!"
    });
  });
});
