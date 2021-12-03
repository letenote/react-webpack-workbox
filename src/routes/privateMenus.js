import React from "react";
import { Redirect } from "react-router-dom";

const privateMenus = [
  {
    path: "/",
    initial: "dashboard",
    type: "single",
    exact: true,
    // lazyComponent: React.lazy(() => import("../containers/dashboard/Dashoard")),
  },
  {
    path: "/article",
    initial: "article",
    type: "single",
    exact: false,
    // lazyComponent: React.lazy(() => import("../containers/article/Article")),
  },
  {
    path: "/category",
    initial: "category",
    type: "nested",
    exact: false,
    // lazyComponent: React.lazy(() => import("../containers/categories/Category"))
    nested: [
      {
        path: "/category",
        initial: "index",
        type: "single",
        exact: true,
        // lazyComponent: () => <Redirect to={"/category/primary"}/>,
      },
      {
        path: "/category/primary",
        initial: "primary",
        type: "single",
        exact: false,
        // lazyComponent: React.lazy(() => import("../containers/categories/Category")),
      },
      {
        path: "/category/sub",
        initial: "sub",
        type: "single",
        exact: false,
        // lazyComponent: React.lazy(() => import("../containers/categories/SubCategory")),
      }
    ]
  },
  {
    path: "/media",
    initial: "media",
    type: "nested",
    exact: false,
    nested: [
      {
        path: "/media",
        initial: "index",
        type: "single",
        exact: true,
        // lazyComponent: () => <Redirect to={"/media/images"}/>,
      },
      {
        path: "/media/images",
        initial: "images",
        type: "single",
        exact: false,
        // lazyComponent: React.lazy(() => import("../containers/media/Image")),
      }
    ]
  },
  {
    path: "/message",
    initial: "message",
    type: "single",
    exact: false,
    // lazyComponent: React.lazy(() => import("../containers/message/Message")),
  },
];

export default privateMenus;