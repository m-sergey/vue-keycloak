<template>
    <MDBContainer>
        <MDBRow>
            <h1>Success auth</h1>
        </MDBRow>
        <MDBRow>
            <MDBCol class="align-self-center">
                <MDBBtn color="info" rounded @click="refresh()">Refresh</MDBBtn>
                <MDBBtn color="danger" rounded @click="logout()">Logout</MDBBtn>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBCol class="align-self-center">
                <MDBTable>
                    <thead>
                        <tr>
                            <td>Param</td>
                            <td>Value</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Error</td>
                            <td>{{ error }}</td>
                        </tr>
                        <tr>
                            <td>Auth code</td>
                            <td>{{ authCode }}</td>
                        </tr>
                        <tr>
                            <td class="text-nowra">Code verifer</td>
                            <td> {{ codeVerifier }}</td>
                        </tr>
                        <tr>
                            <td class="text-nowrap">Access Token</td>
                            <td class="text-break">{{ accessToken }}</td>
                        </tr>
                        <tr>
                            <td class="text-nowrap">Refresh Token</td>
                            <td class="text-break">{{ refreshToken }}</td>
                        </tr>
                    </tbody>
                </MDBTable>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
</template>

<script setup>
// import { useAuthStore } from '@/stores/auth';
// import { toRefs } from 'vue';

console.log("setup")

    // const store = useAuthStore();
    // const { clientId } = toRefs(store)
</script>

<script>
import { MDBTable, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-vue-ui-kit';
import axios from "axios";
import qs from 'qs';
import { useSessionStorage } from "@vueuse/core"

export default {
    data() {
        return {
            codeVerifier: useSessionStorage("codeVerifier", "<undefined>"),
            authCode: this.$route.query.code,
            keycloakURL: "http://192.168.88.20:8080",
            clientId: "webapp",
            redirectURI: "http://localhost:8080/authsuccess",
            accessToken: "",
            refreshToken: "",
            error: this.$route.query.error
        }
    },
    components: {
        MDBTable,
        MDBContainer,
        MDBRow,
        MDBCol,
        MDBBtn,
    },
    mounted() {
        if (!this.error) {
            console.log("clientId " + this.store);
            const data = {
                "grant_type": "authorization_code",
                "client_id": this.clientId,
                "code": this.authCode,
                "code_verifier": this.codeVerifier,
                "redirect_uri": this.redirectURI
            };

            axios.
                post(this.keycloakURL + "/realms/Clients/protocol/openid-connect/token", qs.stringify(data)).
                then((response) => {
                    console.log("Access token");
                    console.log(response.data);
                    this.accessToken = response.data.access_token;
                    this.refreshToken = response.data.refresh_token;
                }).
                catch((error) => {
                    console.log('error')
                    console.log(error)
                });

        }
    },
    methods: {
        logout() {
            const data = {
                "client_id": this.clientId,
                "refresh_token": this.refreshToken
            };

            axios.
                post(this.keycloakURL + "/realms/Clients/protocol/openid-connect/logout", qs.stringify(data)).
                then((response) => {
                    console.log("Logout");
                    console.log(response.data);
                    this.$router.push("/user");
                }).
                catch((error) => {
                    console.log('error')
                    console.log(error)
                });
        },
        refresh() {
            const data = {
                "client_id": this.clientId,
                "grant_type": "refresh_token",
                "refresh_token": this.refreshToken
            };

            axios.
                post(this.keycloakURL + "/realms/Clients/protocol/openid-connect/token", qs.stringify(data)).
                then((response) => {
                    console.log("Refresh");
                    console.log(response.data);
                    this.accessToken = response.data.access_token;
                    this.refreshToken = response.data.refresh_token;
                }).
                catch((error) => {
                    console.log('error')
                    console.log(error)
                });
        },
    }
}
</script>