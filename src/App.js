import React from 'react';
import { Provider } from "react-redux";
const Routes = React.lazy(() => import("./routes"));
import store from './store'
const App = () => {
  return (
    <React.Suspense fallback={<div>Loading..</div>}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </React.Suspense>
  )
}

export default App;