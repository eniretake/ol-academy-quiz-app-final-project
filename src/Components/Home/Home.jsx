import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const attempts = JSON.parse(localStorage.getItem("attempts")) || [];
  const lastAttempt =
    attempts.length > 0
      ? attempts.sort((a, b) => {
          return a.time > b.time ? -1 : 1;
        })[0]
      : null;

  return (
    <div className="page">
      <h1>TRIVIA QUIZ</h1>
      {lastAttempt !== null && (
        <h5>
          last score:{"  "}
          <span style={{ color: "#12af64" }}>
            {lastAttempt.score} / {lastAttempt.total}
          </span>
          <br />
          last attempt time :{" "}
          <span style={{ color: "#EE3625" }}>{lastAttempt.time}</span>
        </h5>
      )}
      <div className="buttons-wrapper">
        <Link to="quiz" className="btn-link">
          <button> START</button>
        </Link>
        <Link to="history" className="btn-link">
          <button className="btn-history">HISTORY</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
