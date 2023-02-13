import Vue from 'vue'
import Router from "vue-router";
// import HomeView from '../views/HomeView.vue'

Vue.use(Router)

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem('user'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  }
  else {
    next('/'); // go to '/login';
  }
}

export default new Router({
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
  mode: 'history',
  routes: [

    //Admin Routes start- Register-Login Pages 
    {
      path: "/",
      name: "login",
      component: () => import("../Admin/UserPages/Login.vue")
    },
    {
      path: "/register_user",
      name: "register_user",
      meta: { layout: "userpages" },
      component: () => import("../Admin/UserPages/Register.vue")
    },
    {
      path: "/forgot_password",
      name: "forgot_password",
      meta: { layout: "userpages" },
      component: () => import("../Admin/UserPages/ForegtPassword.vue")
    },
    {
      path: '/reset_password_form',
      name: 'reset_password_form',
      component: () =>
        import('../Admin/UserPages/ResetPasswordForm.vue'),
      meta: { layout: 'userpages' },
    },

    
    //After Login Pages

    {
      path: "/stripe",
      name: "stripe",
      component: () => import("../Admin/UserPages/Stripe.vue")
    },

    {
      path: "/user_list",
      name: "user_list",
      component: () => import("../Admin/UserPages/UserList.vue")
    },
    {
      path: "/coupon_list",
      name: "coupon_list",
      component: () => import("../Admin/UserPages/CouponSetup.vue")
    },
    {
      path: "/subscription_plans",
      name: "subscription_plans",
      component: () => import("../Admin/UserPages/SubscriptionPlans.vue")
    },

  ]
});



