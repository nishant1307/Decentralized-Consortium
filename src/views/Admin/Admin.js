// core components/views for Admin layout
import React from "react";
const OrgList = React.lazy(() => import('./OrgList'));
const UserList = React.lazy(() => import('./UserList'));

const adminRoutes = [
  {
    path: "/orglist",
    component: OrgList,
    layout: "/admin"
  },
  {
    path: "/userlist",
    component: UserList,
    layout: "/admin"
  },
];

export default adminRoutes;
