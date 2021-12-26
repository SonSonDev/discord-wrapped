import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import No from "./components/No";
import Wrapped from "./components/Wrapped";

const App = () => {

  const routes = useRoutes([
    { path: "/", element: <No /> },
    { path: "/:id", element: <div className="page"><Wrapped /></div> },
  ]);
  return routes;
};

const AppWrapper: React.FC = (): JSX.Element => {
  return (
    <div className="app-container">
      <Router>
        <App />
      </Router>
    </div>
  );
};

export default AppWrapper;
