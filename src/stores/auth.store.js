import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return { 
        keycloakURL: "http://192.168.88.20:8080",
        clientId: "webapp",
        redirectURI: "http://localhost:8080/authsuccess",
        isAuth: false, 
    };
  },
  actions: {
    login() {
      this.isAuth = true;
    },
    logout() {
        this.isAuth = false;
    },    
  },
});
