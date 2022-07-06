import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"
import Login from "../views/auth/Login.vue"
import Register from "../views/auth/Register.vue"
import Projects from "../views/projects/Projects.vue"
import Publications from "../views/publications/Publications.vue"
import Team from "../views/team/Team.vue"
import AddPerson from "../views/team/AddPerson.vue"
import EditPerson from "../views/team/EditPerson.vue"
import ProtecaoDados from "../views/ProtecaoDados.vue"
import PoliticaPrivacidade from "../views/PoliticaPrivacidade.vue"
import FAQs from "../views/FAQs.vue"
import AddProject from "../views/projects/AddProject.vue"
import AddPublication from "../views/publications/AddPublication.vue"

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
    path: "/edit-person",
    name: "EditPerson",
    component: EditPerson,
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
