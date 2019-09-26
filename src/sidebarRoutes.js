import React from "react";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import ShoppingCart from "@material-ui/icons/ShoppingCart"
import TrendingUp from "@material-ui/icons/TrendingUp"
import DescriptionIcon from '@material-ui/icons/Description';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Store from "@material-ui/icons/Store";
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import BuildIcon from '@material-ui/icons/Build';
const dashboardRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: Dashboard,
    layout: "/dashboard"
  },
  {
    path: "/projects",
    name: "Projects",
    icon: DescriptionIcon,
    layout: "/dashboard"
  },
  {
    path: "/partners",
    name: "Partners",
    icon: AccessibilityIcon,
    layout: "/dashboard"
  },
  // {
  //   name: 'Tools',
  //   path: '/home',
  //   icon: BuildIcon,
  //   layout: "/dashboard"
  // },
  {
    name: 'Modules',
    path: '/modules',
    icon: ViewModuleIcon,
    layout: "/dashboard"
  },

  {
    path: "/devices",
    name: "Devices",
    icon: DeviceHubIcon,
    layout: "/dashboard"
  },
  {
    path: "/products",
    name: "Products",
    icon: Store,
    layout: "/dashboard"
  },
  {
    path: "/documents",
    name: "Documents",
    icon: FileCopyIcon,
    layout: "/dashboard"
  },
  {
    name: 'Plans',
    path: '/pricing',
    icon: ShoppingCart,
    layout: "/dashboard"
  },
  {
    path: "/support",
    name: "Support",
    icon: ContactSupportIcon,
    layout: "/dashboard"
  },
];

export default dashboardRoutes;
