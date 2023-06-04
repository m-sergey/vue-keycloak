<template>
  <MDBContainer>
    <MDBRow>
      <h1>Home Page</h1>
    </MDBRow>
  </MDBContainer>
</template>

<script>
    import { MDBContainer, MDBRow} from 'mdb-vue-ui-kit';
    import {v4 as uuidv4} from 'uuid';

    export default {
        components: {
            MDBContainer,
            MDBRow,
        },
        data() {
            return {
                message: "",
                tabId: uuidv4()
            }
        },
        methods: {
        }
    }

</script>
