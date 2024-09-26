import { Issuer } from "openid-client";
import { custom } from "openid-client";
import { readFileSync } from "fs";

const keycloak = await Issuer.discover(process.env.ISSUER_BASE_URL);

const keycloakAPI = new keycloak.Client({
    client_id: process.env.CLIENT_ID,
    token_endpoint_auth_method: "tls_client_auth",
    token_endpoint_auth_signing_alg: "EdDSA",
    id_token_signed_response_alg: "EdDSA",
    authorization_signed_response_alg: "EdDSA",
    tls_client_certificate_bound_access_tokens: false,
})

keycloakAPI[custom.http_options] = async function(url, options) {
    return { 
        key: readFileSync(process.env.CLIENT_KEY_PATH, "utf8"),
        cert: readFileSync(process.env.CLIENT_CERT_PATH,"utf8"),
    };
}

export default keycloakAPI;