import { createRouter, createWebHistory } from 'vue-router';
import About from '../views/About.vue';
import Account from '../views/Account.vue';
import CreateApp from '../views/CreateApp.vue';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import ShowApp from '../views/ShowApp.vue';
import AppList from '../views/AppList.vue';
import Signin from '../views/Signin.vue';
import Signup from '../views/Signup.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/apps'
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/my-apps',
    name: 'MyApps',
    component: AppList,
    props: {
      mine: true
    }
  },
  {
    path: '/apps',
    name: 'AppList',
    component: AppList
  },
  {
    path: '/app/:appId',
    name: 'ShowApp',
    component: ShowApp
  },
  {
    path: '/create-app',
    name: 'CreateApp',
    component: CreateApp
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
