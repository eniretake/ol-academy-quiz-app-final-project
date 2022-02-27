import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";
import { fetchData } from "../../Services/fetchData";
import { Boolean } from "../QuestionTypes/Boolean/Boolean";
import { Multiple } from "../QuestionTypes/Multiple/Multiple";
import { Single } from "../QuestionTypes/Single/Single";
import TryAgain from "../TryAgain/TryAgain";
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

  const setDataWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };
  const getDataWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  useEffect(() => {
    const getData = async () => {
      const tempData = await fetchData();
      setDataWithExpiry("data", tempData, 600000);
      setData({
        questions: getDataWithExpiry("data").questions,
        answers: getDataWithExpiry("data").answers,
      });
    };
    getDataWithExpiry("data")
      ? setData({
          questions: getDataWithExpiry("data").questions,
          answers: getDataWithExpiry("data").answers,
        })
      : getData();
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
        <div className="final-page">
          <div className="score-container">
            <h3>Total score:</h3>
            <h1>
              {score} / {questions.length}
            </h1>
          </div>
          <TryAgain value={score} total={questions.length} />
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
