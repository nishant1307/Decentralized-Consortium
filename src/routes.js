// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Maps from "views/Maps/Maps.jsx";
import Apps from "views/Apps/Apps.jsx";
import Projects from "views/Projects/Projects.jsx";
import ProjectPage from "views/Projects/ProjectPage.jsx";
import Partners from "views/Partners/Partners.jsx";
import PricingPage from "views/Pricing/PricingPage.js";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    component: DashboardPage,
    layout: "/dashboard"
  },
  {
    path: "/user",
    name: "User Profile",
    component: UserProfile,
    layout: "/dashboard"
  },
  {
    path: "/maps",
    name: "Maps",
    component: Maps,
    layout: "/dashboard"
  },
  {
    path: "/apps",
    name: "Apps",
    component: Apps,
    layout: "/dashboard"
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    layout: "/dashboard"
  },
  {
    path: "/projects/:projectID",
    name: "Projects",
    component: ProjectPage,
    layout: "/dashboard"
  },
  {
    path: "/partners",
    name: "Partners",
    component: Partners,
    layout: "/dashboard"
  },
  {
    name: 'Analytics',
    path: '/analytics',
    component: Apps,
    layout: "dashboard"
  },
  {
    name: 'Plans',
    path: '/pricing',
    component: PricingPage,
    layout: "/dashboard"
  },
];

export default dashboardRoutes;
