const { mTLSAgent } = require("./mTLSAgent");
const { Axios } = require("axios");

const keycloakAPI = Axios.create({
    baseURL: process.env.ISSUER_BASE_URL,
    httpsAgent: mTLSAgent,
})

module.exports = { keycloakAPI };