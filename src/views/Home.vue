<template>
  <div class="home">

  <pre v-if="token && token.length > 1 && token !== null" class="container">
    <div class="card bg-black" v-for="(snap, key) of snaps.data" :key="key">
      <a href="" v-on:click.prevent="storeDuration(snap.duration, snap.snap_id, snap.from)">{{snap.from}}</a>
    </div>
  </pre>

  <ul v-if="errors && errors.length">
    <li v-for="(error, index) of errors" :key="index">
      {{error.message}}
    </li>
  </ul>

  </div>

</template>

<script>
import axios from 'axios'
import store from '@/store'
import router from '@/router'

export default {
  data() {
    return {
      snaps: [],
      errors: []
    };
  },
  computed: {
    token: function () {
         return store.token
    },
    api: function () {
      return store.api
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
  mounted: function () {
    if(this.hasToken === false) {
        return router.push('/login')
    }
  },
  created() {
    axios.get(store.api + '/snaps', {
        headers: {
          token: this.token
      }
    })
    .then(response => {
      this.snaps = response.data;
    })
    .catch(e => {
      this.errors.push(e);
    });
  },
  methods: {
    storeDuration: function(duration, snap_id, from) {
      localStorage.setItem('duration', duration)
      localStorage.setItem('from', from)

      return router.push({
        name: "snap",
        params: {
          id: snap_id
        }
      })
    }
  }
};
</script>
