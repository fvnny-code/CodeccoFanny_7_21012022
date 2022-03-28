import Vue from "vue";
import Vuex from "vuex";

const axios = require('axios');
const instance = axios.create({
    baseURL: "http://localhost:3000/api/auth"
})

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        userInfos: {
            email: "",
            pseudo: "",
            password: "",
            avatar: "" 
        },
    },
    actions: {
        signup: ({ commit }, userInfos) => {
        commit;
        return new Promise((resolve, reject) => {
            instance.post('/login', userInfos)
            .then(function (response) {
            //   commit('setStatus', '');
            //   commit('logUser', response.data);
              resolve(response);
            })
            .catch(function (error) {
            //   commit('setStatus', 'error_login');
              reject(error);
            });
          });
          
        }, 
    },
});