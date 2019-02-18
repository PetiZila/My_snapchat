<template>
    <div class="snap">
        <h1>FROM: {{ from }}</h1>
        <h2>{{chrono}}</h2>
        <img v-bind:src="src"/>
    </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'
import router from '@/router'

export default {
    data () {
        return {
            image: '',
            src: [],
            from: '',
            chrono: localStorage.getItem('duration')
        }
    },
    computed: {
        token: function () {
         return store.token
        },
        hasToken: function() {
            if(this.token && this.token.length > 1 && this.token !== null) {
                return true
            }
            else {
                return false
            }
        },
        snapId: function() {
            var link = window.location.pathname;
            if (link.slice(-1)[0] === '/') {
                return link.split("/").slice(-2)[0];
            }
            return link.split("/").slice(-1)[0];
        }
    },
    mounted: function () {
        if(this.hasToken === false) {
            return router.push('/login')
        }
    },
    created() {
        var duration = localStorage.getItem('duration') * 1000
        this.from = localStorage.getItem('from')
        this.src = store.api + '/snap/' + this.snapId
        setTimeout(function() {
            this.src = null
            return router.push('/')
        }, duration);

        let loop = setInterval(() => {
            this.chrono -= 1
            if(this.chrono < 2) {
            clearInterval(loop);
            }
        }, 1000);
        store.seen(this.snapId);
    }
}
</script>
