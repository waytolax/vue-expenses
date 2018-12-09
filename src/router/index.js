import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const ExpensesPage = () => import('../components/ExpensesPage');
const AddEditPage = () => import('../components/AddEditPage');

export default new Router({
  routes: [
    {
        path: '/',
        name: 'ExpensesPage',
        component: ExpensesPage
    },
    {
        path: '/add',
        name: 'AddPage',
        component: AddEditPage
    },
    {
        path: '/edit/:id',
        name: 'EditPage',
        component: AddEditPage
    },
    {
        path: '*',
        redirect: '/',
    },
  ],
  mode: 'history',
});
