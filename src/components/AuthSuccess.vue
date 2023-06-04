<template>
  EMPTY
</template>

<script setup>
    import { useAuthStore } from '@/stores/auth.store';
    import { toRefs } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    console.log("setup")

    const route = useRoute();
    const router = useRouter();
    console.log(route.query);

    const store = useAuthStore();
    store.fillCodeChallenge();
    const { isAuth, keycloakURL, clientId, redirectURI, codeVerifier, codeChallenge, keycloakRedirectURL, accessToken, refreshToken, authCode, authError } = toRefs(store);
    console.log("route.query.error", route.query.error);
    store.setError(route.query.error);
    if (!route.query.error) {
        store.login(route.query.code);
    } else {
        console.log("error", this.error);
    }
    router.push("/user");
</script>
