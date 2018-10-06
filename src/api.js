const REGION = 'us-central1'
const PROJECT_ID = 'paytweetb'
const URL =
    process.env.NODE_ENV === 'production'
        ? `https://${REGION}-${PROJECT_ID}.cloudfunctions.net`
        : 'http://localhost:5001/paytweetb/us-central1'

export default {
    subscribe(data) {
        return fetch(`${URL}/subscribe`, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data),
        }).then(response => response.json())
    },
}
