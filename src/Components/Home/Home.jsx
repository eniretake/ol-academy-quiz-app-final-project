import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  return (
    <div className="page">
        <h1>QUIZ TIME</h1>
      <div className="buttons-wrapper">
        <Link to="quiz" className="btn-link">
          <button>START QUIZ</button>
        </Link>
        <Link to="history" className="btn-link">
          <button className="btn-history">HISTORY</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
