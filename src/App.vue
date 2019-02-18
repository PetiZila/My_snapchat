<template>
  <div id="app">
  <router-link to="/"><img src="./assets/snapchat-blue.png"></router-link>
    <div id="nav" class="row no-margin">
      <router-link to="/">Home&nbsp;</router-link> |
      <router-link to="/about">&nbsp;About&nbsp;</router-link> |
      <div v-if="hasToken === true" >
        <router-link to="/upload">&nbsp;Upload</router-link> |
        <a href="" @click.prevent="logout()">&nbsp;Logout</a>
      </div>
      <div v-else>
        <router-link to="/login">&nbsp;Login</router-link> |
        <router-link to="/register">Register</router-link>
      </div>

    </div>
    <router-view/>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'Navbar',
  data() {
    return {
      errors: []
    };
  },
  computed: {
    token: {
      get:  function() {
        return store.token
      }
    },
    hasToken: function() {
      if(this.token && this.token.length > 1 && this.token !== null) {
        return true
      }
      else {
        return false
      }
    }
  },
  methods: {
    logout: function () {
      store.logout()
    }
  }
}
</script>
