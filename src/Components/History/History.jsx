import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./History.scss";

const History = () => {
  const [attempts, setAttempts] = useState([]);
  const [showContextMenu, setShowContextMenu] = useState(false);

  useEffect(() => {
    const tmpAttempts = JSON.parse(localStorage.getItem("attempts") || []);
    setAttempts(tmpAttempts);
  }, []);

  return (
    <div className="page">
      <div className="history-table">
        <h2>ATTEMPTS HISTORY</h2>

        <table>
          <thead>
            <tr>
              <th>RANK</th>
              <th>SCORE</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {attempts.length > 0 &&
              attempts.map((attempt, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    {attempt.score} / {attempt.total}
                  </td>
                  <td>{attempt.time}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="buttons-wrapper">
        <Link to="/" className="btn-link">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default History;
