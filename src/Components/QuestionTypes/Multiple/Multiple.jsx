import React, { useState } from "react";

export const Multiple = (props) => {
  const [isCorrect, setIsCorrect] = useState(null);
  const [selected, setSelected] = useState([]);
  const [confirm, setConfirm] = useState(false);

  const selectAnswer = (id) => {
    if (!confirm) {
      if (selected.includes(id + 1)) {
        let tmp = [...selected];
        let index = tmp.indexOf(id + 1);
        if (index !== -1) {
          tmp.splice(index, 1);
        }
        setSelected(tmp);
      } else {
        const tmp = [...selected, id + 1];
        setSelected(tmp);
      }
    }
  };

  const arrayCompare = (_arr1, _arr2) => {
    if (
      !Array.isArray(_arr1) ||
      !Array.isArray(_arr2) ||
      _arr1.length !== _arr2.length
    ) {
      return false;
    }

    const arr1 = _arr1.concat().sort();
    const arr2 = _arr2.concat().sort();

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  };

  const handleConfirm = () => {
    setConfirm(true);
    if (arrayCompare(selected, props.answer.answer)) {
      setIsCorrect(true);
      props.newScore(props.score + 1);
    } else setIsCorrect(false);
  };

  return (
    <div className="question-container">
      <div className="question-content">
        <h3>{props.question.question}</h3>

        <div className="answer-options">
          {props.question.options.map((option, index) => (
            <div
              key={option}
              className={
                "single-option " +
                (isCorrect === true && selected.some((el) => el - 1 === index)
                  ? "correct"
                  : isCorrect === false &&
                    selected.some((el) => el - 1 === index)
                  ? "wrong"
                  : selected.some((el) => el - 1 === index)
                  ? "active "
                  : "")
              }
              onClick={() => selectAnswer(index)}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      </div>
      {!confirm && !!selected.length && (
        <button onClick={() => handleConfirm()} disabled={!selected}>
          Confirm
        </button>
      )}
      {confirm && <button onClick={() => props.onClick()}>Next</button>}
    </div>
  );
};
