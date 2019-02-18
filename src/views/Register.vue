<template>

<div class="container">
    <div class="offset-lg-3 offset-md-3 offset-sm-3 col-lg-6 col-md-6 col-sm-6">
        <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-8 col-md-8 col-sm-8 bg-black">
            <form type="post" class="login-form" id="login-form" @submit.prevent>
                <div class="form-group">
                    <label class="whiteFont" for="Email">Email address</label>
                    <input type="email" class="form-control blu" id="Email" placeholder="Enter email" v-model="email"/>
                </div>
                <div class="form-group">
                    <label class="whiteFont" for="Password">Password</label>
                    <input type="password" class="form-control blu" id="password" placeholder="Password" v-model="password">
                </div>
                <div class="form-group">
                    <label class="whiteFont" for="Password">Confirm your Password</label>
                    <input type="password" class="form-control" id="passwordConfirm" placeholder="Confirm Password" v-model="passwordConfirm">
                </div>
                <button type="submit" class="btn btn-primary" @click="postPost()">Register</button>
            </form>
        </div>
    </div>

 <ul v-if="errors && errors.length">
    <li v-for="(error, index) of errors" :key="index">
      {{error.message}}
    </li>
  </ul>

</div>

</template>

<script>
import axios from 'axios';
import store from '@/store'
import router from '@/router'

export default {
    name: 'Register',
    data() {
        return {
        email: '',
        password: '',
        passwordConfirm: '',
        errors: []
        }
    },
    computed: {
        token: {
            get:  function() {
                return store.token
            }
        },
        hasToken: function() {
            if(this.token && this.token.length > 1 && this.token !== null) {
                return router.push('/')
            }
            else {
            return false
            }
        }
    },
    mounted: function () {
        if(this.hasToken === true) {
           return router.push('/')
        }
    },
    methods: {
        postPost: function () {
            if (this.password === this.passwordConfirm) {
                this.password = this.passwordConfirm;
            }
            else {
                return print('Passwords are not the same!');
            }
            axios.post( store.api + '/inscription', {
            email: this.email,
            password: this.password
            })
            .then(function response() {
                return router.push('/login')
            })
            .catch(e => {
            this.errors.push(e)
            })
        }
    }
}
</script>
