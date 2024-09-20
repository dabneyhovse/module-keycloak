const mTLSAgent = require("./mTLSAgent");
const axios = require("axios").default;

const keycloakAPI = axios.create({
    baseURL: process.env.ISSUER_BASE_URL,
    httpsAgent: mTLSAgent,
})

module.exports = keycloakAPI;