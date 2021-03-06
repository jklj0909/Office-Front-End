import Vue from "vue";
import VueX from "vuex";

Vue.use(VueX);
const store = new VueX.Store({
    state: {
        user: {
            isLogin: false,
            username: "",
            email: ""
        },
        breadcrumbItems: []
    },
    mutations: {
        afterLogin(state, info) {
            state.user.isLogin = true;
            state.user.username = info.username;
            state.user.email = info.email;
        },
        logout(state) {
            state.user.isLogin = false;
            state.user.username = "";
            state.user.email = ""
        },
        updateBreadcrumbItems(state, info) {
            state.breadcrumbItems = info;
        }
    }
});
export default store;