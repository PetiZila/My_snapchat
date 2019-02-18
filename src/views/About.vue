<template>
  <div class="about">
    <h1>This is an about page.</h1>
    <p>Everything in there is just a school project.</p>
  </div>
</template>

<script>
import store from '@/store'

export default {
  data() {
    return {
      a: 'LOL'
    }
  },
created: function () {
    if (store.token && store.token > 1) {
      console.log('email is: ' + store.email)
    console.log('token is: ' + store.token)
    }
  }
}
</script>

