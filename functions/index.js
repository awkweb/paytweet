const functions = require('firebase-functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.createPlan = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!')
})

exports.subscribe = functions.https.onRequest((request, response) => {
    console.log(request.body)
    const { twitter, stripe } = functions.config()
    const { twitterKey, twitterSecret } = twitter
    const { stripeKey } = stripe
    response.send('Hello from Firebase!')
})
