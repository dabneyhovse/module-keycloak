const mTLSAgent = require("./mTLSAgent");
const { Issuer } = require("openid-client");
const { custom } = require("openid-client");
const { readFile } = require("fs/promises");

const keycloak = await Issuer.discover(process.env.ISSUER_BASE_URL);

const keycloakAPI = new keycloak.Client({
    client_id: process.env.CLIENT_ID,
    token_endpoint_auth_method: "tls_client_auth",
    token_endpoint_auth_signing_alg: "EdDSA",
    id_token_signed_response_alg: "EdDSA",
    authorization_signed_response_alg: "EdDSA",
    tls_client_certificate_bound_access_tokens: true,
})

keycloakAPI[custom.http_options] = async function(url, options) {
    return { 
        key: await readFile(process.env.CLIENT_KEY_PATH, "utf8"),
        cert: await readFile(process.env.CLIENT_CERT_PATH, "utf8"),
    };
}

module.exports = keycloakAPI;