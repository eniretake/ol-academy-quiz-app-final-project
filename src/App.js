import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import "./App.scss";
import Home from "./Components/Home/Home";

const AppRoutes = () => {
  let routes = useRoutes([{ path: "/", element: <Home /> }]);
  return routes;
};

function App() {
  return (
    <div className="container">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
