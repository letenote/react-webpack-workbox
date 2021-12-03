import React, { Suspense } from "react";
import '../public/styles/main.css';
import ReactDOM from "react-dom";
import store from "./store";
import registerServiceWorker from "../workbox/registerServiceWorker";

const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <Suspense fallback={<div>Loading..</div>}>
    <App store={store}/>
  </Suspense>,
  document.getElementById("root")
);
registerServiceWorker();
