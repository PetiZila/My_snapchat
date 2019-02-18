<template>
    <div class="container">

        <form type="post" @submit.prevent class="large-12 medium-12 small-12 cell">
            <div >
                <label class="col-lg-3 col-md-3 col-sm-3">
                    <h5>File</h5>
                    <input type="file" id="file" ref="file" v-on:change="fileUpload()" accept="image/*"/>
                </label>
            </div>
            <div v-if="selected === true">
                <label class="col-lg-5 col-md-5 col-sm-5">
                    <h5>Send to:</h5>

                    <select v-model="selectedMail" class="col-lg-12 col-md-12 col-sm-12">
                        <option v-for="(value, key) in mailList" :key='key'>{{ value.email }}</option>
                    </select>

                </label>
                <label class="col-lg-3 col-md-3 col-sm-3">
                    <h5>Duration</h5>
                    <select v-model="selectedDuration">
                        <option class="col-lg-1 col-md-1 col-sm-1" v-for="(value, nbr) in numbers" :key='nbr' :value="numbers[nbr]">{{value}}</option>
                    </select>
                </label>
            </div>
            <button v-if="selectedMail.length > 1 && selectedDuration" class="col-lg-3 col-md-3 col-sm-3" v-on:click="submitFile()">Submit</button>
        </form>

    </div>
</template>

<script>
import axios from "axios"
import store from '@/store'

export default {
    data() {
        return {
            file: '',
            mailList: [],
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            selected: false,
            selectedMail: '',
            selectedDuration: ''
        }
    },
    computed: {
      token: function () {
         return store.token
        }
    },
    created() {
    axios.get(store.api + '/all', {
        headers: {
          token: this.token
        }
        })
        .then(response => {
            this.mailList = response.data.data
        })
        .catch(e => {
            this.errors.push(e);
        });
    },
    methods: {
        fileUpload(){
        this.file = this.$refs.file.files[0]
        this.selected = true
        },
        submitFile() {
            let data = new FormData()
            data.append('duration', this.selectedDuration)
            data.append('to', this.selectedMail)
            data.append('image', this.file)

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: store.token
                }
            }
            axios.post(  store.api + '/snap', data, config)
            .then(function(){
                console.log('Snapchat uploaded!');
                })
            .catch(function(){
                console.log('Unable to send snapchat.');
            });
        }
    }
}
</script>
