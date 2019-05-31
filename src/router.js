import Vue from 'vue'
import Router from 'vue-router'

import {
  auth
} from "@/firebase";


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/bebida/:id',
      name: 'bebida',
      component: () => import('./views/Bebida.vue')
    },
    {
      path: '/Ingredient/:id',
      name: 'Ingredient',
      component: () => import('./views/Ingredient.vue')
    },
    {
      path: '/filtro',
      name: 'filtro',
      component: () => import('./views/Filtro.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('./views/Chat.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const user = auth.currentUser
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  } else {
    next()
  }
})



export default router;