// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout

const dashboardRoutes = [
  {
    path: "/orglist",
    name: "Dashboard",
    icon: Dashboard,
    layout: "/admin"
  },
  {
    path: "/userlist",
    name: "User List",
    icon: Person,
    layout: "/admin"
  },
];

export default dashboardRoutes;
