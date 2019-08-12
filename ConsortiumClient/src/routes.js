// core components/views for Admin layout
import React from "react";
// import DashboardPage from "views/Dashboard/Dashboard.jsx";
// import UserProfile from "views/UserProfile/UserProfile.jsx";
// import ProjectLocation from "views/Maps/ProjectLocation.jsx";
// import Apps from "views/Apps/Apps.jsx";
// import Projects from "views/Projects/Projects.jsx";
// import ProjectPage from "views/Projects/ProjectPage.jsx";
// import Partners from "views/Partners/Partners.jsx";
// import PricingPage from "views/Pricing/PricingPage.js";
// import ProjectPartners from "views/Partners/ProjectPartners.jsx";
// import People from "views/People/People.jsx";
// import DocConekt from './views/DocConekt';
import DocConekt from './views/DocConekt/UploadFile';
import Wallet from './views/DocConekt/Wallet';
const DashboardPage = React.lazy(() => import('views/Dashboard/Dashboard.jsx'));
const UserProfile = React.lazy(() => import('views/UserProfile/UserProfile.jsx'));
const ProjectLocation = React.lazy(() => import('views/Maps/ProjectLocation.jsx'));
const Apps = React.lazy(() => import('views/Apps/Apps.jsx'));
const Projects = React.lazy(() => import('views/Projects/Projects.jsx'));
const ProjectPage = React.lazy(() => import('views/Projects/ProjectPage.jsx'));
const Partners = React.lazy(() => import('views/Partners/Partners.jsx'));
const PricingPage = React.lazy(() => import('views/Pricing/PricingPage.js'));
const ProjectPartners = React.lazy(() => import('views/Partners/ProjectPartners.jsx'));
const People = React.lazy(() => import('views/People/People.jsx'));
const TimelineComponent = React.lazy(() => import('components/Timeline/Timeline.jsx'));
import StructuredDoc from 'views/DocConekt/StructuredDoc';
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
    path: "/apps",
    name: "Apps",
    component: Apps,
    layout: "/dashboard"
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
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
    path: "/projects/:projectID/location",
    name: "Project Locations",
    component: ProjectLocation,
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
    name: 'Analytics',
    path: '/analytics',
    component: Apps,
    layout: "dashboard"
  },
  {
    name: 'Plans',
    path: '/pricing',
    component: PricingPage,
    layout: "/dashboard"
  },
];

export default dashboardRoutes;
