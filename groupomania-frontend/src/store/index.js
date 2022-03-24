import Vue from "vue";
import Vuex from "vuex";

const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status:'',
        user: user, 
        userInfos: {
            prenom: "",
            nom: "",
            email: "",
            photo: "",
        },
    },
    actions: {
        createAccount: ({commit}, userInfos) => {
            commit('setStatus', 'loading');
            console.log(userInfos);
            return new Promise((resolve, reject)=>{
                commit;
                instance.post('/createAccount', userInfos)
                .then(function(response){
                    commit('setStatus', 'created')
                    resolve(response);
                })
                .catch(function(error){
                    commit('setStatus', 'created');
                    reject(error);
                });
            });
        }, 
    },
});