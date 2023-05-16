<template>
  <MDBContainer>
    <MDBRow>
      <h1>Home Page</h1>
    </MDBRow>
    <MDBRow>
      <textarea v-model="message" />
    </MDBRow>
    <MDBRow>
      <MDBCol>
        <button @click="postMessage()">
          Send
        </button>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</template>

<script>
    import { MDBContainer, MDBRow, MDBCol } from 'mdb-vue-ui-kit';
    import { sendMessage } from "../worker-api";

    export default {
        components: {
            MDBContainer,
            MDBRow,
            MDBCol,
        },
        data() {
            return {
                message: "",
            }
        },
        methods: {
            postMessage() {
                sendMessage(this.message);
            }
        }
    }

</script>
