import React, { useState } from "react";

export const Boolean = (props) => {
  const [isCorrect, setIsCorrect] = useState(null);
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const selectAnswer = (ans) => {
    if (!confirm) {
      setSelected(ans);
    }
  };

  const handleConfirm = () => {
    setConfirm(true);
    if (selected === props.answer.answer) {
      setIsCorrect(true);
      props.newScore(props.score + 1);
    } else setIsCorrect(false);
  };

  return (
    <div className="question-container">
      <div className="question-content">
        <h3>{props.question.question}</h3>

        <div className="answer-options">
          <div
            className={
              "single-option " +
              (isCorrect === true && selected === true
                ? "correct"
                : isCorrect === false && selected === true
                ? "wrong"
                : selected === true
                ? "active "
                : "")
            }
            onClick={() => selectAnswer(true)}
          >
            <span>true</span>
          </div>
          <div
            className={
              "single-option " +
              (isCorrect === true && selected === false
                ? "correct"
                : isCorrect === false && selected === false
                ? "wrong"
                : selected === false
                ? "active "
                : "")
            }
            onClick={() => selectAnswer(false)}
          >
            <span>false</span>
          </div>
        </div>
      </div>
      {!confirm && selected !== null && (
        <button onClick={() => handleConfirm()}>Confirm</button>
      )}
      {confirm && <button onClick={() => props.onClick()}>Next</button>}
    </div>
  );
};
