import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Projects from "../views/Projects.vue"
import Publications from "../views/Publications.vue"
import Team from "../views/Team.vue"
import AddPerson from "../views/AddPerson.vue"
import ProtecaoDados from "../views/ProtecaoDados.vue"
import PoliticaPrivacidade from "../views/PoliticaPrivacidade.vue"
import FAQs from "../views/FAQs.vue"
import AddProject from "../views/AddProject.vue"
import AddPublication from "../views/AddPublication.vue"

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
    path: "/add-publication",
    name: "AddPublication",
    component: AddPublication,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/add-project",
    name: "AddProject",
    component: AddProject,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/add-person",
    name: "AddPerson",
    component: AddPerson,
  },
  {
    path: "/protecao-dados",
    name: "ProtecaoDados",
    component: ProtecaoDados,
  },
  {
    path: "/politica-privacidade",
    name: "PoliticaPrivacidade",
    component: PoliticaPrivacidade,
  },
  {
    path: "/faqs",
    name: "FAQs",
    component: FAQs,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
