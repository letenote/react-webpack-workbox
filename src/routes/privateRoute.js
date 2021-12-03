import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
const Main = React.lazy(() => import("../layouts/Main"));

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Route
        {...rest}
        render={(props) => {
          if(rest.authed){
            if(rest.routeType === "single"){
              return (
                <Main>
                  <Component {...props} />
                </Main>
              )
            }
            if(rest.routeType === "nested"){
              return PrivateNestedRoute(rest)
            }
          }else{
            return <Redirect to="/login" />
          }
        }}
      />
    </Suspense>
  );
};

const PrivateNestedRoute = ( rest ) => {
  return(
    <Switch>
      { PrivateNestedRouteLoop(rest) }
    </Switch>
  )
}

const PrivateNestedRouteLoop = ( rest ) => {
  return rest.nestedRoute.map((menu, menuIndex) => (
    <Route 
      {...rest}
      key={menuIndex} 
      exact={menu.exact} 
      path={menu.path} 
      render={(props) => {
        return (
          <Main>
            <menu.lazyComponent {...props} />
          </Main>
        )
      }}
    />
  ))
}

export default PrivateRoute;
