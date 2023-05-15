<!--
http://192.168.88.20:8080/realms/Clients/protocol/openid-connect/auth?client_id=undefined&response_type=code&code_challenge_method=S256&code_challenge=-sUEoAV-txYvhniiuJ4-gwNCtsiD2XiIPvLQYm-sUsE&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fauthsuccess
-->

<template>
    <h1>User Info</h1>
    <div v-if="!isAuth">
            <a :href="keycloakURL + '/realms/Clients/protocol/openid-connect/auth?client_id=' + clientId + '&response_type=code&code_challenge_method=S256&code_challenge=' + codeChallenge + '&redirect_uri=' + encodeURIComponent(redirectURI)">Login</a>
    </div>
    <div v-else>
            <a :href="keycloakURL + '/realms/Clients/protocol/openid-connect/auth?client_id=' + clientId + '&response_type=code&code_challenge_method=S256&code_challenge=' + codeChallenge + '&redirect_uri=' + encodeURIComponent(redirectURI)">Logut</a>
    </div>
    <MDBContainer>
        <MDBRow>
            <MDBCol class="align-self-center">
                <MDBTable>
                    <thead>
                        <td>Param</td>
                        <td>Value</td>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Keycloak URL</td>
                            <td>{{ keycloakURL }}</td>
                        </tr>
                        <tr>
                            <td>Keycloak client ID</td>
                            <td>{{ clientId }}</td>
                        </tr>
                        <tr>
                            <td>Redirect URI</td>
                            <td>{{ redirectURI }}</td>
                        </tr>
                        <tr>
                            <td>Code Verifier</td>
                            <td>{{ codeVerifier }}</td>
                        </tr>
                        <tr>
                            <td>Code challenge</td>
                            <td>{{ codeChallenge }}</td>
                        </tr>
                    </tbody>
                </MDBTable>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
</template>

<script setup>
    import { useAuthStore } from '@/stores/auth'
    import { toRefs } from 'vue';

    const store = useAuthStore();
    const { isAuth, keycloakURL, clientId, redirectURI } = toRefs(store)
</script>

<script>
import { MDBTable, MDBContainer, MDBRow, MDBCol, } from 'mdb-vue-ui-kit';
import { useSessionStorage } from "@vueuse/core"


function generateCodeVerifier() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

function sha256(plain) { // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a) {
    var str = "";
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function challenge_from_verifier(v) {
    var hashed = await sha256(v);
    var base64encoded = base64urlencode(hashed);
    return base64encoded;
}

export default {
    data() {
        return {
            // keycloakURL: 'http://192.168.88.20:8080',
            cleintId: "webapp",
            redirectURI: "http://localhost:8080/authsuccess",
            codeVerifier: useSessionStorage("codeVerifier", generateCodeVerifier()),
            codeChallenge: "",
        }
    },
    created() {
        console.log(this.codeVerifier);
        challenge_from_verifier(this.codeVerifier).then(value => this.codeChallenge = value);
    },
    computed: {
        keycloakRedirectURL() {
            return this.keycloakURL +
                '/realms/Clients/protocol/openid-connect/auth?response_type=code&code_challenge_method=S256' +
                '&client_id=' + this.cleintId +
                '&code_challenge=' + this.codeChallenge +
                '&redirect_uri=' + encodeURIComponent(this.redirectURI);
        },
    },
    components: {
        MDBTable,
        MDBContainer,
        MDBRow,
        MDBCol,
    },
}
</script>
