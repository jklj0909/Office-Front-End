import Vue from "vue";
import VueX from "vuex";

Vue.use(VueX);
const store = new VueX.Store({
    state: {
        user: {
            isLogin: false,
            username: "",
            email: ""
        }
    },
    mutations: {
        afterLogin(state, info) {
            state.user.isLogin = true;
            state.user.username = info.username;
            state.user.email = info.email;
        }
    }
});
export default store;