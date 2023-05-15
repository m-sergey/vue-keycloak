<template>
  <header>
    <!-- Navbar -->
    <MDBNavbar
      expand="lg" 
      light 
      bg="white" 
      container
    >
      <MDBNavbarToggler
        target="#navbarExample01"
        @click="collapse1 = !collapse1"
      />
      <MDBCollapse
        id="#navbarExample01"
        v-model="collapse1"
      >
        <MDBNavbarNav class="mb-2 mb-lg-0">
          <MDBNavbarItem>
            <router-link to="/">
              Home
            </router-link>
          </MDBNavbarItem>
          <MDBNavbarItem>&nbsp;</MDBNavbarItem>
          <MDBNavbarItem>
            <router-link to="/user">
              User
            </router-link>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    <div id="nav" />
  </header>
  <router-view />
</template>

<script>
    import { MDBNavbar, MDBNavbarToggler, MDBNavbarNav, MDBNavbarItem, MDBCollapse } from 'mdb-vue-ui-kit';
    import { ref } from 'vue';

    export default {
        name: 'App',
        components: {
            MDBNavbar,
            MDBNavbarToggler,
            MDBNavbarNav,
            MDBNavbarItem,
            MDBCollapse
        },
        setup() {
            const collapse1 = ref(false);
            return { collapse1 };
        }
    }
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
