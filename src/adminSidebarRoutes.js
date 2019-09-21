// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
// core components/views for Admin layout

const dashboardRoutes = [
  {
    path: "/orglist",
    name: "Organization List",
    icon: Dashboard,
    layout: "/admin"
  },
  {
    path: "/userlist",
    name: "User List",
    icon: Person,
    layout: "/admin"
  },
  {
    path: "/partners",
    name: "Partners",
    icon: AccountBalanceIcon,
    layout: "/admin"
  },
];

export default dashboardRoutes;
