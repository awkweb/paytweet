const REGION = 'us-central1'
const PROJECT_ID = 'paytweetb'
const URL =
    process.env.NODE_ENV === 'production'
        ? `https://${REGION}-${PROJECT_ID}.cloudfunctions.net`
        : `http://localhost:5000/${PROJECT_ID}/${REGION}`

export default {
    getUserInfo(username) {
        return fetch(`${URL}/getUserInfo?username=${username}`, {
            method: 'GET',
        }).then(response => response.json())
    },
    createPlan(data) {
        return fetch(`${URL}/createPlan`, {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(response => response.json())
    },
    subscribe(data) {
        return fetch(`${URL}/subscribe`, {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(response => response.json())
    },
}
