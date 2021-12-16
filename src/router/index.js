import { 
  About, Account, CreateApp, Home, 
  NotFound, ShowApp, AppList, Signin, 
  Signup, ConnectionLost
} from '@/views';
import { createRouter, createWebHistory } from 'vue-router';
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
        next({ name: 'AppList', params: { mine: false } });
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
    path: '/app/:appId([0-9]+)',
    name: 'ShowApp',
    component: ShowApp,
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
    path: '/connection-lost',
    name: 'ConnectionLost',
    component: ConnectionLost
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
