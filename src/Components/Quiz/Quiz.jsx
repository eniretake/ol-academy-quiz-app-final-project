import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";
import { fetchData } from "../../Services/fetchData";
import { Single } from "../QuestionTypes/Single/Single";
import "./Quiz.scss";

const Quiz = () => {
  const [data, setData] = useState({ questions: [], answers: [] });
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [score, setScore] = useState(0);

  const answerFilteredWithId = (id) => {
    let index = null;
    answers.find((answer, i) => {
      if (answer.id === id) {
        index = i;
      }
      return index;
    });
  };
  const handleNext = () => {
    setCurrentQuestionId(currentQuestionId + 1);
  };

  const handleSettingScore = (newScore) => {
    setScore(newScore);
  };

  useEffect(() => {
    const getData = async () => {
      const tempData = await fetchData();
      setData({ questions: tempData.questions, answers: tempData.answers });
    };
    getData();
  }, []);

  const { questions, answers } = data;

  return !questions ? (
    <div className="page">
      <Rings color="#FFB03B" height={150} width={150} />
    </div>
  ) : (
    <div className="page">
      {currentQuestionId < questions.length ? (
        questions[currentQuestionId].type === "single" ? (
          <Single
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
            score={score}
            newScore={handleSettingScore}
          ></Single>
        ) : questions[currentQuestionId].type === "multiple" ? (
          <p>multiple</p>
        ) : (
          <p>bool</p>
        )
      ) : (
        <p>try again</p>
      )}
      <div className="progress-bar-container">
        <Progress
          color="warning"
          value={((currentQuestionId + 1) / questions.length) * 100}
        >
          {currentQuestionId + 1}/{questions.length}
        </Progress>
      </div>
    </div>
  );
};

export default Quiz;
