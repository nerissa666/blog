import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },


  {
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: "about" */ '../views/MessageView.vue')
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import(/* webpackChunkName: "about" */ '../views/LinkView.vue')
  },
  {
    path: '/about',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/user',
    name: 'User',

    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAdmin) {
        next({ name: '403' });
      } else {
        next();
      }
    },
    component: () => {
      if (!store.getters.isAdmin) {
        
      } else {
        return import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
      }
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFoundView.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import(/* webpackChunkName: "about" */ '../views/ArticleView.vue')
  },
  {
    path: '/article/:id',
    name: 'ArticleId',
    children: [],
    component: () => import(/* webpackChunkName: "about" */ '../views/ArticleIdView.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import(/* webpackChunkName: "about" */ '../views/NoPermission.vue')
  },{
    path: '/500',
    name: '500',
    component: () => import(/* webpackChunkName: "about" */ '../views/ServerError.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
