const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const cors = require('cors')({
    origin: process.env.NODE_ENV === 'production' ? 'true' : '*',
})
const twitter = require('twitter')

exports.getUserInfo = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const {
            query: { username },
        } = request

        admin
            .database()
            .ref('users/')
            .once('value', snapshot => {
                const users = snapshot.val()
                let userInfo
                Object.keys(users).some(key => {
                    const user = users[key].additionalUserInfo.profile
                    if (`@${user.screen_name}` === username) {
                        userInfo = user
                    }
                })
                response.status(200).send(userInfo)
            })
    })
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
        const {
            source,
            subscriber: subscriberId,
            creator: creatorUsername,
        } = JSON.parse(request.body)

        const { twitterKey, twitterSecret } = functions.config().twitter
        const { stripeKey } = functions.config().stripe

        const subscriberUser = admin.database().ref(`users/${subscriberId}`)
        console.log(subscriberUser)
        subscriberUser.once('value', snapshot => {
            const value = snapshot.val()
            console.log(value)
        })

        // TODO: Make subscription

        // Create friendship

        // Send DM to creator

        response.status(200).send({
            message: 'subscribe success!',
        })
    })
})
