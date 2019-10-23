// core components/views for Admin layout
import React from "react";
// import DocConekt from './views/DocConekt/UploadFile';
const DocConekt = React.lazy(() => import('views/DocConekt/UploadFile'));
// import Wallet from './views/DocConekt/Wallet';
import DashboardPage from "views/Dashboard/Dashboard.jsx";
// import AddDeviceToProject from "views/Devices/AddDeviceToProject";
import DevicesOfProject from "views/Devices/DevicesOfProject";
import ProductsOfProject from "views/Products/ProductsOfProject";
const Wallet = React.lazy(() => import('views/DocConekt/Wallet'));
// const DashboardPage = React.lazy(() => import('views/Dashboard/Dashboard.jsx'));
const UserProfile = React.lazy(() => import('views/UserProfile/UserProfile.jsx'));
const OrganizationProfile = React.lazy(() => import('views/OrganizationProfile'));
const UserInfo = React.lazy(() => import('views/UserProfile/UserInfo.jsx'));
// const Apps = React.lazy(() => import('views/Apps/Apps.jsx'));
const Certifications = React.lazy(() => import("views/Claims&Certifications/Certifications"));
const Projects = React.lazy(() => import('views/Projects/Projects.jsx'));
const Products = React.lazy(() => import('views/Products/Products.jsx'));
const Documents = React.lazy(() => import('views/DocConekt/Documents.jsx'));
// const AddProductToProject = React.lazy(() => import('views/Products/AddProductToProject.jsx'));
const ProjectPage = React.lazy(() => import('views/Projects/ProjectPage.jsx'));
const SupportPage = React.lazy(() => import('views/SupportPage'));
const Partners = React.lazy(() => import('views/Partners/Partners.jsx'));
const PricingPage = React.lazy(() => import('views/Pricing/PricingPage.js'));
// const Checkout = React.lazy(() => import('views/Pricing/Checkout.jsx'));
const People = React.lazy(() => import('views/People/People.jsx'));
const TimelineComponent = React.lazy(() => import('components/Timeline/Timeline.jsx'));
const Devices = React.lazy(() => import('views/Devices/Devices'))
const StructuredDoc = React.lazy(() => import('views/DocConekt/StructuredDoc'))
const Modules = React.lazy(() => import('views/Modules/Modules'))
const UnstrucutredDoc = React.lazy(()=> import('views/DocConekt/UnstructuredDoc'));
const ProjectInvites =React.lazy(()=> import('views/Projects/ProjectInvites'));

// import StructuredDoc from 'views/DocConekt/StructuredDoc';
const dashboardRoutes = [
  {
    path: "/structured/:structuredDocId",
    name: "DocConekt",
    component: StructuredDoc,
    layout: "/dashboard"
  },
  {
    path: "/unstructured",
    name: "DocConekt",
    component: UnstrucutredDoc,
    layout: "/dashboard"
  },
  {
    path: "/projects/:projectID/documents",
    name: "DocConekt",
    component: Documents,
    layout: "/dashboard"
  },
  {
    path: "/docconekt/upload",
    name: "DocConekt",
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
    path: "/certifications",
    name: "Certifications",
    component: Certifications,
    layout: "/dashboard"
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    layout: "/dashboard"
  },
  {
    path: "/documents",
    name: "Documents",
    component: Documents,
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
    component: DevicesOfProject,
    layout: "/dashboard"
  },
  {
    path: "/projects/:projectID/journey",
    name: "Project Journey",
    component: TimelineComponent,
    layout: "/dashboard"
  },
  {
    path: "/projects/:projectID/products",
    name: "Products",
    component: ProductsOfProject,
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
  {
    name: 'Modules',
    path: '/modules',
    component: Modules,
    layout: "/dashboard"
  }
  ,{
    path: "/projectinvites",
    name: "Project Invites",
    component: ProjectInvites,
    layout: "/dashboard"
  }
];

export default dashboardRoutes;
