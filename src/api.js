const REGION = 'us-central1'
const PROJECT_ID = 'paytweetb'
const URL =
    process.env.NODE_ENV === 'production'
        ? `https://${REGION}-${PROJECT_ID}.cloudfunctions.net`
        : `http://localhost:5001/${PROJECT_ID}/${REGION}`

export default {
    subscribe(data) {
        return fetch(`${URL}/subscribe`, {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(response => response.json())
    },
}
