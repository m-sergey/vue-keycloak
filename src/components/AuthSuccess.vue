<template>
    <h1>Success auth</h1>
    <div>
        <table>
            <tr>
                <td>Param</td>
                <td>Value</td>                
            </tr>
            <tr>
                <td>Error</td>
                <td>{{ this.$route.query.error }}</td>
            </tr>
            <tr>
                <td>Auth code</td>
                <td>{{ this.$route.query.code }}</td>
            </tr>
            <tr>
                <td>Code verifer</td>
                <td> {{ codeVerifier }}</td>
            </tr>
        </table>
    </div>
</template>

<script>

import { useSessionStorage } from "@vueuse/core"

export default {
    data() {
        return {
            codeVerifier: useSessionStorage("codeVerifier", ""),
        }
    },
    ready() {
        this.codeVerifier  = window.sessionStorage.getItem('_codeVerifier');
    }
}
</script>