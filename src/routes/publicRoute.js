/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
const Main = React.lazy(() => import("../layouts/Main"));

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Route
        {...rest}
        render={(props) => {
          if ( rest.routeType === "single" ) {
            console.log("PUBLIC_ROUTE",props)
            return(
              <Main>
                <Component {...props} />
              </Main>
            )
          }
          if(rest.routeType === "nested"){
            return PublicNestedRoute(rest)
          }
        }}
      />
    </Suspense>
  );
};

const PublicNestedRoute = ( rest ) => {
  return(
    <Switch>
      { PublicNestedRouteLoop(rest) }
    </Switch>
  )
}

const PublicNestedRouteLoop = ( rest ) => {
  return rest.nestedRoute.map((menu, menuIndex) => (
    <Route 
      {...rest}
      key={menuIndex} 
      exact={menu.exact} 
      path={menu.path} 
      render={(props) => (
        <Main>
          <menu.lazyComponent {...props} />
        </Main>
      )}
    />
  ))
}

export default PublicRoute;