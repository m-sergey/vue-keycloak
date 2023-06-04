import { defineStore } from 'pinia';
import jwt_decode from "jwt-decode";
import axios from "axios";
import qs from 'qs';
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

function getKeycloakRedirectURL(keycloakURL, cleintId, redirectURI, codeChallenge) {
  return keycloakURL +
  '/realms/Clients/protocol/openid-connect/auth?response_type=code&code_challenge_method=S256' +
  '&client_id=' + cleintId +
  '&code_challenge=' + codeChallenge +
  '&redirect_uri=' + encodeURIComponent(redirectURI);  
}

export const useAuthStore = defineStore('auth', {
  
  state: () => {
    return { 
        keycloakURL: "http://192.168.88.20:8080",
        clientId: "webapp",
        redirectURI: "http://localhost:8080/authsuccess",
        codeVerifier: useSessionStorage("codeVerifier", generateCodeVerifier()),
        //challenge_from_verifier(this.codeVerifier).then(value => this.codeChallenge = value)
        codeChallenge: "",
        isAuth: false,
        accessToken: "",
        refreshToken: "",
        authCode: "",
        authError: ""
    };
  },
  getters: {
    keycloakRedirectURL: (state) => getKeycloakRedirectURL(state.keycloakURL, state.clientId, state.redirectURI, state.codeChallenge),
  },  
  actions: {
    fillCodeChallenge() {
      challenge_from_verifier(this.codeVerifier).then(value => this.codeChallenge = value)
    },
    login(authCode) {
      this.authCode = authCode;
      console.log("authCode", this.authCode);
      console.log("clientId", this.clientId);

      const data = {
        "grant_type": "authorization_code",
        "client_id": this.clientId,
        "code": authCode,
        "code_verifier": this.codeVerifier,
        "redirect_uri": this.redirectURI,
    };

    axios.
        post(this.keycloakURL + "/realms/Clients/protocol/openid-connect/token", qs.stringify(data)).
        then((response) => {
            console.log("Access token");
            console.log(response.data);
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
            this.isAuth = true;
        }).
        catch((error) => {
            console.log('error')
            console.log(error)
        });
      // dispatch('autoRefresh', tokens)
    },
    logout() {
      this.isAuth = false;
      const data = {
        "client_id": this.clientId,
        "refresh_token": this.refreshToken
    };

    axios.
        post(this.keycloakURL + "/realms/Clients/protocol/openid-connect/logout", qs.stringify(data)).
        then((response) => {
            console.log("Logout");
            console.log(response.data);
            this.accessToken = "";
            this.refreshToken = "";
        }).
        catch((error) => {
            console.log('error')
            console.log(error)
        });
    },
    updateTokens() {
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
    // updateTokens(context, tokens) {
    //   const { state, commit, dispatch } = context
    //   const { accessToken } = state
    //   const { exp } = jwt_decode(accessToken)
    //   console.log("exp ", exp)
    // },
    setError(error) {
      this.authError = error;
    }
  },
});
