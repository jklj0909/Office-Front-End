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
const UserInfo = () => import('views/main/content/user/UserInfo');
const Operation = () => import('views/main/content/practise/Operation');
const Selection = () => import('views/main/content/practise/Selection');
const OperationSingle = () => import('views/main/content/practise/single/OperationSingle');
const AnswerSingle = () => import('views/main/content/practise/single/AnswerSingle');
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
    },
    {
        path: '/profile/info',
        component: UserInfo
    },
    {
        path: '/practise/operation',
        component: Operation
    },
    {
        path: '/practise/selection',
        component: Selection
    },
    {
        path: '/practise/operation/single/:id',
        component: OperationSingle
    },
    {
        path: '/practise/answer/single/:studentQid',
        component: AnswerSingle
    }
];
const router = new Router({
    mode: 'history',
    routes
});
export default router;