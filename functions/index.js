const path = require('path')
const functions = require('firebase-functions')
const env =
    process.env.NODE_ENV === 'development'
        ? require('./config/dev.env')
        : require('./config/prod.env')

exports.createSubscription = functions.firestore
    .document('customers/{userID}')
    .onCreate(event => {
        const data = event.data.data()
        return
    })
