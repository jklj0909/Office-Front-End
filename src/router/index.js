import Vue from 'vue';
import Router from 'vue-router';
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err)
};
const Index = () => import('views/main/content/index');
const Login = () => import('views/main/content/user/Login');
const Register = () => import('views/main/content/user/Register');
Vue.use(Router);

const routes = [
    {
        path: '',
        redirect: '/index'
    },
    {
        path: '/index',
        component: Index
    },
    {
        path: '/profile/login',
        component: Login
    },
    {
        path: '/profile/register',
        component: Register
    }
];
const router = new Router({
    mode: 'history',
    routes
});
export default router;