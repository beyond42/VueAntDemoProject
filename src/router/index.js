import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import TestPage from "@/views/TestPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
  {
    path: "/test",
    name: "Test",
    component: TestPage
  }

  // ? Primjer za lazy load route
  //   {
  //     path: "/test",
  //     name: "Test",
  //     // route level code-splitting
  //     // this generates a separate chunk (testpage.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     /* webpackChunkName: "testpage" */
  //     component: () => import("../views/TestPage.vue")
  //   }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
export default router;
