// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Maps from "views/Maps/Maps.jsx";
import Apps from "views/Apps/Apps.jsx";
import Projects from "views/Projects/Projects.jsx";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/dashboard"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/dashboard"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/dashboard"
  },
  {
    path: "/apps",
    name: "Apps",
    icon: LocationOn,
    component: Apps,
    layout: "/dashboard"
  }
];

export default dashboardRoutes;
