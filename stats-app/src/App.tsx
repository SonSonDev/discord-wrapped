import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import No from "./pages/No";
import Stats from "./pages/Stats";
import BackgroundCanvas from "./components/BackgroundCanvas";

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <No /> },
    { path: "/:id", element: <div className="page"><Stats /></div> },
    { path: "/:id/:section", element: <div className="page"><Stats /></div> },
    { path: "/:id/:section/:index", element: <div className="page"><Stats /></div> },
  ]);
  return routes;
};

const AppWrapper: React.FC = (): JSX.Element => {
  return (
    <div className="app-container">
      <BackgroundCanvas />
      <Router>
        <App />
      </Router>
    </div>
  );
};

export default AppWrapper;
