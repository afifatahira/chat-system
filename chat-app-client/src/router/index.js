import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      forVisitors:false,
      forAuth:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      forVisitors:true,
      forAuth:false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{
      forVisitors:true,
      forAuth:false
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

let user = ()=>{
  return localStorage.getItem('user')
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.forVisitors)) {
    if (user())
      next({
        path: "/"
      });
    else next();
  } else if (to.matched.some(record => record.meta.forAuth)) {
    if (!user())
      next({
        path: "/login"
      });
    else next();
  } else next();
})

export default router
