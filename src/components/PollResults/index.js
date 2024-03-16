import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";

const socket = io("https://live-polling-backend.onrender.com/");

function PollResults({ teacherMode }) {
  const [question, setQuestion] = useState(null);
  const [optionResults, setOptionResults] = useState([]);
  const [showAnswer, setShowAnswer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("questionResults", (data) => {
      setQuestion(data.question);
      setOptionResults(data.optionResults);
      // setCorrectAnswerIndex(data.correctAnswerIndex);
    });

    socket.on("clearScreen", () => {
      if (!teacherMode) {
        sessionStorage.removeItem("answerSubmitted"); // Remove answerSubmitted to allow answering next questions
      }
      setShowAnswer(null);
      navigate("/answerQuestion");
    });

    socket.on("revealAnswer", () => {
      const correctAnswerIndex = sessionStorage.getItem("correctAnswerIndex");
      console.log("correctAnswerIndex: ", correctAnswerIndex);
      setShowAnswer(correctAnswerIndex);
    });

    return () => {
      socket.off("questionResults");
      socket.off("clearScreen");
      socket.off("revealAnswer");
    };
  }, [teacherMode, navigate]);

  const calculatePercentage = (optionCount) => {
    const totalStudents = optionResults.reduce(
      (acc, option) => acc + (option.count || 0),
      0
    );
    if (totalStudents === 0) return "-"; // Return a placeholder when no students have submitted answers
    return ((optionCount / totalStudents) * 100).toFixed(2);
  };

  const handleAskAnotherQuestion = () => {
    sessionStorage.removeItem("correctAnswerIndex"); // Remove correctAnswerIndex from sessionStorage
    socket.emit("clearScreen"); // socket event to clear screen and ask another question
    navigate("/createPoll");
  };

  const handleRevealAnswer = () => {
    socket.emit("revealAnswer");
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-white text-lg">Polling results</h1>
      </div>
      <hr />
      {question ? (
        <div className="p-4 flex flex-col items-center mt-[40px]">
          <h1 className="text-yellow-100 text-lg">{question} ?</h1>
          <ul className="mt-4 w-1/2 mb-4">
            {optionResults.map((option, index) => (
              <li
                id={`option-${index}`}
                className={
                  "flex justify-between mb-4 border-2 p-1 bg-yellow-500"
                }
                key={index}
              >
                <div className="flex items-center">
                  {showAnswer == index && <span className="mr-3">✔</span>}
                  <span>{option.option}</span>
                </div>
                <span className="mr-4">
                  {calculatePercentage(option.count) === "-"
                    ? "-"
                    : calculatePercentage(option.count) + "%"}
                </span>
              </li>
            ))}
          </ul>
          {teacherMode ? (
            <div className="flex justify-between w-1/2 mt-2">
              <button
                className="border-2 bg-yellow-100 border-slate-700 p-2 rounded hover:bg-yellow-200"
                onClick={handleAskAnotherQuestion}
              >
                Ask Another Question
              </button>
              <button
                className="border-2 bg-yellow-100 border-slate-700 p-2 rounded hover:bg-yellow-200 mr-2"
                onClick={handleRevealAnswer}
              >
                Reveal Answer
              </button>
            </div>
          ) : (
            <button className="border-2 bg-yellow-100 border-slate-700 p-2 rounded hover:bg-yellow-200 cursor-not-allowed">
              Waiting for new answer
            </button>
          )}
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <Bars
            height="80"
            width="80"
            color="white"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
}

export default PollResults;
