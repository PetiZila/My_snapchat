import Vue from "vue"
import axios from "axios"


export default new Vue({
    data: {
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        api: 'https://api.snapchat.wac.epitech.eu'
    },
    methods: {
        login: function (email, password) {
            return axios.post(this.api + '/connection', {
                    email: email,
                    password: password
                })
                .then((response) => {
                    localStorage.setItem('email', response['data']['data']['email'])
                    localStorage.setItem('token', response['data']['data']['token'])
                    this.email = localStorage.getItem('email')
                    this.token = localStorage.getItem('token')
                    return Promise.resolve();
                })
        },
        logout: function () {
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            this.email = null
            this.token = null
            return Promise.resolve();
        },
        seen: function (id) {
            console.log(id)
            axios.post(this.api + '/seen', {
                id: id
            }, {
                headers: {
                    token: this.token
                }
            })
        }
    }

});