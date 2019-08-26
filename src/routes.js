// core components/views for Admin layout
import React from "react";
// import DocConekt from './views/DocConekt/UploadFile';
const DocConekt = React.lazy(() => import('views/DocConekt/UploadFile'));
// import Wallet from './views/DocConekt/Wallet';
import DashboardPage from "views/Dashboard/Dashboard.jsx";
const Wallet = React.lazy(() => import('views/DocConekt/Wallet'));
// const DashboardPage = React.lazy(() => import('views/Dashboard/Dashboard.jsx'));
const UserProfile = React.lazy(() => import('views/UserProfile/UserProfile.jsx'));
const OrganizationProfile = React.lazy(() => import('views/OrganizationProfile'));
const UserInfo = React.lazy(() => import('views/UserProfile/UserInfo.jsx'));
// const Apps = React.lazy(() => import('views/Apps/Apps.jsx'));
const Projects = React.lazy(() => import('views/Projects/Projects.jsx'));
const Products = React.lazy(() => import('views/Products/Products.jsx'));
const ProjectPage = React.lazy(() => import('views/Projects/ProjectPage.jsx'));
const SupportPage = React.lazy(() => import('views/SupportPage'));
const Partners = React.lazy(() => import('views/Partners/Partners.jsx'));
const PricingPage = React.lazy(() => import('views/Pricing/PricingPage.js'));
const ProjectPartners = React.lazy(() => import('views/Partners/ProjectPartners.jsx'));
const People = React.lazy(() => import('views/People/People.jsx'));
const TimelineComponent = React.lazy(() => import('components/Timeline/Timeline.jsx'));
const Devices = React.lazy(()=>import('views/Devices/Devices'))
const StructuredDoc = React.lazy(()=>import('views/DocConekt/StructuredDoc'))

// import StructuredDoc from 'views/DocConekt/StructuredDoc';
const dashboardRoutes = [
  {
    path: "/structured/:structuredDocId",
    component: StructuredDoc,
    layout: "/dashboard"
  },
  {
    path: "/docconekt/explore",
    component: Wallet,
    layout: "/dashboard"
  },
  {
    path: "/docconekt/upload",
    component: DocConekt,
    layout: "/dashboard"
  },
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
    path: "/settings",
    name: "Settings",
    component: OrganizationProfile,
    layout: "/dashboard"
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    layout: "/dashboard"
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    layout: "/dashboard"
  },
  {
    path: "/devices",
    name: "Devices",
    component: Devices,
    layout: "/dashboard"
  },
  {
    path: "/support",
    name: "Support",
    component: SupportPage,
    layout: "/dashboard"
  },
  {
    path: "/people",
    name: "People",
    component: People,
    layout: "/dashboard"
  },
  {
    path: "/projects/:projectID",
    name: "Projects",
    component: ProjectPage,
    layout: "/dashboard"
  },
  {
    path: "/projects/:projectID/devices",
    name: "Device List",
    component: Devices,
    layout: "/dashboard"
  },
  {
    path: "/projects/:projectID/partners",
    name: "Project Partners",
    component: ProjectPartners,
    layout: "/dashboard"
  },
  {
    path: "/projects/:projectID/journey",
    name: "Project Journey",
    component: TimelineComponent,
    layout: "/dashboard"
  },
  {
    path: "/partners",
    name: "Partners",
    component: Partners,
    layout: "/dashboard"
  },
  {
    name: 'Plans',
    path: '/pricing',
    component: PricingPage,
    layout: "/dashboard"
  },
];

export default dashboardRoutes;
