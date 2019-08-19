// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import OrgList from "views/Admin/OrgList";
import UserList from "views/Admin/UserList";

const dashboardRoutes = [
  {
    path: "/orglist",
    name: "Dashboard",
    icon: Dashboard,
    component: OrgList,
    layout: "/admin"
  },
  {
    path: "/userlist",
    name: "User List",
    icon: Person,
    component: UserList,
    layout: "/admin"
  },
];

export default dashboardRoutes;
