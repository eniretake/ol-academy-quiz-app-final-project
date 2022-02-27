import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TryAgain.scss";

const TryAgain = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPopup = (e) => {
    setShowPopup(true);
  };

  const saveAttempt = () => {
    let attempts = JSON.parse(localStorage.getItem("attempts")) || [];
    let curDate = new Date();
    let dateToString = curDate.toLocaleString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      second: "2-digit",
    });

    attempts.push({
      score: props.value,
      total: props.total,
      time: dateToString,
    });

    attempts.sort((a, b) => {
      return a.score > b.score
        ? -1
        : a.score === b.score
        ? a.time > b.time
          ? -1
          : 1
        : 1;
    });

    localStorage.setItem("attempts", JSON.stringify(attempts));
  };

  useEffect(() => {
    const hidePopup = (e) => {
      if (!popupRef.current?.contains(e.target) && showPopup) {
        setShowPopup(false);
      }
    };
    window.addEventListener("click", hidePopup);

    return () => {
      window.removeEventListener("click", hidePopup);
    };
  });

  return (
    <div className="buttons-wrapper">
      <div className="btn-link">
        <button onClick={openPopup}>Try Again</button>
      </div>
      <Link to="/history" className="btn-link">
        <button className="btn-history" onClick={saveAttempt}>
          HISTORY
        </button>
      </Link>
      {showPopup && (
        <div
          style={{
            visibility: showPopup ? "visible" : "hidden",
            opacity: showPopup ? "1" : "0",
          }}
          className="overlay"
        >
          <div className="popup" ref={popupRef}>
            <h4>Do you want to save this attempt?</h4>
            <span className="close" onClick={closePopup}>
              &#x2717;
            </span>
            <div className="buttons-wrapper popup-buttons">
              <Link to="/" className="btn-link">
                <button onClick={saveAttempt}>Yes</button>
              </Link>
              <Link to="/" className="btn-link">
                <button className="btn-history">No</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryAgain;
