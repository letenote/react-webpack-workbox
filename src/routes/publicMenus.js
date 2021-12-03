import React from "react";
import { Redirect } from "react-router-dom";

const publicMenus = [
  {
    path: "/",
    initial: "home",
    type: "single",
    exact: true,
    lazyComponent: React.lazy(() => import("../pages/film")),
  },
  {
    path: "/film",
    initial: "film",
    type: "single",
    exact: true,
    lazyComponent: React.lazy(() => import("../pages/film")),
  },
  {
    path: "/login",
    initial: "login",
    type: "single",
    exact: true,
    lazyComponent: React.lazy(() => import("../pages/auth/Login")),
  },
  {
    path: "/user",
    initial: "user",
    type: "nested",
    exact: false,
    nested: [
      {
        path: "/user",
        initial: "index",
        type: "single",
        exact: true,
        lazyComponent: () => <Redirect to={"/login"}/>,
      },
      {
        path: "/user/register",
        initial: "register",
        type: "single",
        exact: false,
        lazyComponent: React.lazy(() => import("../pages/auth/Register")),
      },
      {
        path: "/user/verify",
        initial: "verify",
        type: "single",
        exact: false,
        lazyComponent: React.lazy(() => import("../pages/auth/Verify")),
      }
    ]
  }
];

export default publicMenus;