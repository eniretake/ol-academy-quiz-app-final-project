import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";
import { fetchData } from "../../Services/fetchData";
import { Boolean } from "../QuestionTypes/Boolean/Boolean";
import { Multiple } from "../QuestionTypes/Multiple/Multiple";
import { Single } from "../QuestionTypes/Single/Single";
import "./Quiz.scss";

const Quiz = () => {
  const [data, setData] = useState({ questions: [], answers: [] });
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [score, setScore] = useState(0);

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

  return !questions.length ? (
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
          <Multiple
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
            score={score}
            newScore={handleSettingScore}
          ></Multiple>
        ) : (
          <Boolean
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
            score={score}
            newScore={handleSettingScore}
          ></Boolean>
        )
      ) : (
        <div>
          <p>
            {score} / {questions.length}
          </p>
          <p>try again</p>
        </div>
      )}
      <div className="progress-bar-container">
        <Progress
          color="warning"
          value={(currentQuestionId / questions.length) * 100}
        >
          {currentQuestionId}/{questions.length}
        </Progress>
      </div>
    </div>
  );
};

export default Quiz;
