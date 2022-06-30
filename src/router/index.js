import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Projects from "../views/Projects.vue"
import Publications from "../views/Publications.vue"
import Team from "../views/Team.vue"

const routes = [
  {
    path: "",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/team",
    name: "Team",
    component: Team,
  },
  {
    path: "/publications",
    name: "Publications",
    component: Publications,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
