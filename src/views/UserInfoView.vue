<template>
  <h1>User Info</h1>
  <MDBContainer>
    <MDBRow v-if="!isAuth">
      <a :href="keycloakRedirectURL">Login</a>    
    </MDBRow>
    <MDBRow v-else>
      <MDBCol class="align-self-center">
        <MDBBtn
          color="info"
          rounded
          @click="store.updateTokens()"
        >
          Refresh
        </MDBBtn>
        <MDBBtn
          color="danger"
          rounded
          @click="store.logout()"
        >
          Logout
        </MDBBtn>
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
            <tr>
              <td>Error</td>
              <td>{{ authError }}</td>
            </tr>
            <tr>
              <td>Auth code</td>
              <td>{{ authCode }}</td>
            </tr>
            <tr>
              <td class="text-nowrap">
                Access Token
              </td>
              <td class="text-break">
                {{ accessToken }}
              </td>
            </tr>
            <tr>
              <td class="text-nowrap">
                Refresh Token
              </td>
              <td class="text-break">
                {{ refreshToken }}
              </td>
            </tr>
          </tbody>
        </MDBTable>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</template>

<script setup>
    import { useAuthStore } from '@/stores/auth.store';
    import { toRefs } from 'vue';

    const store = useAuthStore();
    const { isAuth, keycloakURL, clientId, redirectURI, codeVerifier, codeChallenge, keycloakRedirectURL, accessToken, refreshToken, authCode, authError } = toRefs(store);    
</script>

<script>
    import { MDBTable, MDBContainer, MDBRow, MDBCol, MDBBtn, } from 'mdb-vue-ui-kit';

    export default {
        components: {
            MDBTable,
            MDBContainer,
            MDBRow,
            MDBCol,
            MDBBtn,
        },
        data() {
            return {
            }
        },
    }
</script>
