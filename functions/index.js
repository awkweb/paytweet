const functions = require('firebase-functions')
const cors = require('cors')({
    origin: true,
})

exports.createPlan = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        response.status(200).send({
            message: 'Hello from Firebase!',
        })
    })
})

exports.subscribe = functions.https.onRequest((request, response) => {
    if (
        request.method === 'GET' ||
        request.method === 'PUT' ||
        request.method === 'DELETE'
    ) {
        return response.status(403).send('Forbidden!')
    }
    return cors(request, response, () => {
        // access body data
        // const data = request.body

        // access firebase config
        // const { twitter, stripe } = functions.config()
        // const { twitterKey, twitterSecret } = twitter
        // const { stripeKey } = stripe

        response.status(200).send({
            message: 'subscribe success!',
        })
    })
})
