import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import {
  getStudentId,
  getStudentName,
  setStudentName,
} from "../../utils/studentSession";
import { BallTriangle } from "react-loader-spinner";

const socket = io("http://localhost:3001");

function Timer({ seconds }) {
  const [countdown, setCountdown] = useState(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-slate-100">
      <span className="border border-1 border-slate-100 p-3 rounded-full">
        {countdown} / {seconds}
      </span>{" "}
      seconds left
    </div>
  );
}

function AnswerForm() {
  const [showInputForm, setShowInputForm] = useState(true);
  const [showWaitingMessage, setShowWaitingMessage] = useState(false);
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [studentName, setStudentNameState] = useState("");
  const [seconds, setSeconds] = useState(10);
  const studentId = getStudentId();
  const navigate = useNavigate();

  useEffect(() => {
    const studentNameFromSession = getStudentName();
    if (studentNameFromSession) {
      setStudentNameState(studentNameFromSession);
      setShowInputForm(false);
      setShowWaitingMessage(true);
    }

    socket.on("askQuestion", (data) => {
      setQuestion(data);
      setShowWaitingMessage(false);
      sessionStorage.setItem("correctAnswerIndex", data.correctAnswerIndex);
      setSeconds(data.timeOut); // Update seconds with the value from socket data
      const timer = setTimeout(() => {
        console.log("Timer expired");
        if (selectedOption)
          socket.emit("submitAnswer", { studentId, selectedOption });
        navigate("/pollResults");
      }, data.timeOut * 1000); // since 1 second = 1000 milliseconds
      return () => clearTimeout(timer);
    });

    socket.on("clearScreen", () => {
      sessionStorage.removeItem("answerSubmitted"); // Allow answering the next question
      setShowWaitingMessage(true);
      setSeconds(10); // Reset the timer
      setSelectedOption(null);
    });

    return () => {
      socket.off("askQuestion");
      socket.off("clearScreen");
    };
  }, [navigate, studentName, studentId]);

  const handleNameChange = (e) => {
    setStudentNameState(e.target.value);
  };

  const handleSubmitName = (e) => {
    e.preventDefault();
    if (studentName.trim() === "") {
      alert("Please enter your name");
      return;
    }
    setStudentName(studentName);
    setShowInputForm(false);
    setShowWaitingMessage(true);
  };

  const handleOptionSelect = (e, index) => {
    setSelectedOption(index);
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (selectedOption === null) {
      alert("Please select an option");
      return;
    }
    // Check if the student has already submitted an answer
    if (sessionStorage.getItem("answerSubmitted")) {
      alert("You have already submitted an answer.");
      return;
    }
    sessionStorage.setItem("answerSubmitted", true); // Mark the answer as submitted
    socket.emit("submitAnswer", { studentId, selectedOption });
    navigate("/pollResults");
  };

  return (
    <div>
      {showInputForm && (
        <div className="flex items-center justify-center h-screen flex-col gap-8">
          <form
            onSubmit={handleSubmitName}
            className="flex flex-col gap-8 items-center"
          >
            <input
              type="text"
              id="studentName"
              placeholder="Enter your name..."
              value={studentName}
              onChange={handleNameChange}
              autoFocus
              className="border border-1 w-[400px] outline-none rounded p-2"
            />
            <button
              className="border-2 border-slate-700 p-3 rounded bg-slate-50 hover:bg-slate-300 w-1/2"
              type="submit"
            >
              Continue
            </button>
          </form>
        </div>
      )}
      {showWaitingMessage && (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <h1 className="text-2xl text-slate-100 block">
            Waiting for teacher to ask question...
          </h1>
          <BallTriangle
            height={80}
            width={80}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={showWaitingMessage}
          />
        </div>
      )}
      {!showInputForm && !showWaitingMessage && question && (
        <div>
          <div>
            <div className="flex justify-between items-center p-4">
              <h1 className="text-white text-xl">
                Select correct option and submit
              </h1>
              <Timer seconds={seconds} />
            </div>
            <hr />
            <div className="p-8 flex flex-col items-center ml-[40px]">
              <h2 className="mt-3 mb-3 text-slate-50 text-lg">
                Q. {question.question} ?
              </h2>
              <div className="ml-2">
                {question.options.map((opt, index) => (
                  <div key={index} className="mb-2 flex gap-3">
                    <input
                      type="radio"
                      name="selectedOption"
                      checked={selectedOption === index}
                      onChange={(e) => handleOptionSelect(e, index)}
                    />
                    <label className="text-white text-md">{opt.text}</label>
                  </div>
                ))}
                <button
                  type="submit"
                  onClick={handleSubmitAnswer}
                  className="rounded border-2 p-3 mt-2 border-slate-700 bg-slate-50 hover:bg-slate-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnswerForm;
