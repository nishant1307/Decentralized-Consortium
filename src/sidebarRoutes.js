import React from "react";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import ShoppingCart from "@material-ui/icons/ShoppingCart"
import TrendingUp from "@material-ui/icons/TrendingUp"
import Add from "@material-ui/icons/Add";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import Apps from "@material-ui/icons/Apps";
const dashboardRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: Dashboard,
    layout: "/dashboard"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    layout: "/dashboard"
  },
  {
    path: "/projects",
    name: "Projects",
    icon: Add,
    layout: "/dashboard"
  },
  {
    path: "/partners",
    name: "Partners",
    icon: AccessibilityIcon,
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
    layout: "dashboard"
  },
  {
    name: 'Plans',
    path: '/pricing',
    icon: ShoppingCart,
    layout: "/dashboard"
  },
];

export default dashboardRoutes;
