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
import { useGuest } from '@/hooks';

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
    component: Signin,
    beforeEnter(to, from, next) {
      const { isSignedIn } = useGuest();

      if (isSignedIn.value) {
        next({ name: 'AppList' });
      } else {
        next();
      }
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter(to, from, next) {
      const { isSignedIn } = useGuest();

      if (isSignedIn.value) {
        next({ name: 'AppList' });
      } else {
        next();
      }
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter(to, from, next) {
      const { isSignedIn } = useGuest();

      if (!isSignedIn.value) {
        next({ name: 'Signin' });
      } else {
        next();
      }
    }
  },
  {
    path: '/my-apps',
    name: 'MyApps',
    component: AppList,
    props: {
      mine: true
    },
    beforeEnter(to, from, next) {
      const { isSignedIn } = useGuest();

      if (!isSignedIn.value) {
        next({ name: 'AppList' });
      } else {
        next();
      }
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
    component: CreateApp,
    beforeEnter(to, from, next) {
      const { isSignedIn } = useGuest();

      if (!isSignedIn.value) {
        next({ name: 'Signin' });
      } else {
        next();
      }
    }
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
