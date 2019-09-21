// core components/views for Admin layout
import React from "react";
const OrgList = React.lazy(() => import('./OrgList'));
const UserList = React.lazy(() => import('./UserList'));
const Partners = React.lazy(() => import('./Partners'));
const adminRoutes = [
  {
    name: "Organization List",
    path: "/orglist",
    component: OrgList,
    layout: "/admin"
  },
  {
    name: "User List",
    path: "/userlist",
    component: UserList,
    layout: "/admin"
  },
  {
    name: "Partners",
    path: "/partners",
    component: Partners,
    layout: "/admin"
  },
];

export default adminRoutes;
