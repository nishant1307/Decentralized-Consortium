// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import ShoppingCart from "@material-ui/icons/ShoppingCart"
import TrendingUp from "@material-ui/icons/TrendingUp"
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Maps from "views/Maps/Maps.jsx";
import Apps from "views/Apps/Apps.jsx";
import Projects from "views/Projects/Projects.jsx";
import PricingPage from "views/Pricing/PricingPage.js";

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
    path: "/apps",
    name: "Apps",
    icon: LocationOn,
    component: Apps,
    layout: "/dashboard"
  },
  {
    name: 'Analytics',
    icon: TrendingUp,
    path: '/analytics',
    component: Apps,
    layout: "dashboard"
  },
  {
    name: 'Plans',
    path: '/pricing',
    icon: ShoppingCart,
    component: PricingPage,
    layout: "/dashboard"
  },
];

export default dashboardRoutes;
