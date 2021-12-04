import React from 'react';
import { Provider } from "react-redux";
import store from './store';
const Routes = React.lazy(() => import("./routes"));

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