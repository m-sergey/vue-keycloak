<template>
  <MDBContainer>
    <MDBRow>
      <h1>Home Page</h1>
    </MDBRow>
    <MDBRow>
      <textarea v-model="message"></textarea>
    </MDBRow>
    <MDBRow>
      <MDBCol>
        <button @click="postMessage()">
          Send
        </button>
        <button @click="registerSelf()">
          Register
        </button>
        <button @click="list()">
          List
        </button>        
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</template>

<script>
    import { MDBContainer, MDBRow, MDBCol } from 'mdb-vue-ui-kit';
    import {v4 as uuidv4} from 'uuid';
    import { toUpperCase, registerTab, listTab } from "../worker-api";

    export default {
        components: {
            MDBContainer,
            MDBRow,
            MDBCol,
        },
        data() {
            return {
                message: "",
                tabId: uuidv4()
            }
        },
        methods: {
            async postMessage() {
                console.log("postMessage");
                const result = await toUpperCase(this.message);
                this.message = result;
            },
            async registerSelf() {
                console.log("register");
                const result = await registerTab(this.tabId); 
            },
            async list() {
                console.log("list");
                const result = await listTab();
                this.message = result;
            }
        }
    }

</script>
