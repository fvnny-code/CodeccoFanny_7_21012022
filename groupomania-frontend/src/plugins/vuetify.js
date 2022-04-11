import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify, {
    iconfont: 'md',
    dicrectives: { scroll }
});

const opts= {}

export default new Vuetify(opts);