import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import "./App.scss";
import History from "./Components/History/History";
import Home from "./Components/Home/Home";
import Quiz from "./Components/Quiz/Quiz";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "/quiz",
      element: <Quiz />,
    },
    {
      path: "/history",
      element: <History />,
    },
  ]);
  return routes;
};

function App() {
  return (
    <div className="Container">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
