const REGION = 'us-central'
const PROJECT_ID = 'paytweetb'
const URL = `https://${REGION}-${PROJECT_ID}.cloudfunctions.net`

export default {
    subscribe(data) {
        return fetch('http://localhost:5001/paytweetb/us-central1/subscribe', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(response => response.json())
    },
}
