import React, { useState } from "react";
import questions from "../questions";
import "./Quiz.css"

const Quiz = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleOptionClick = (option) => {
        setSelectedAnswer((prev) => ({
            ...prev,
            [questionIndex]: option
        }));
    };

    const nextQuestion = () => {
        setQuestionIndex(questionIndex + 1);
    };

    const calculateScore = () => {
        let newScore = 0;
        questions.forEach((question, index) => {
            if (selectedAnswer[index] === question.answer) newScore++;
        });

        setScore(newScore);
        setShowResults(true);
    };

    return (
        <div className="Quiz">
            {showResults ? (
                <div className="results">
                    <h2>Your Score: {score} / {questions.length}</h2>
                    <ul>
                        {questions.map((question, index) => (
                            <li key={index}>
                                <strong>{question.question}</strong>
                                <br />
                                Your Answer: {selectedAnswer[index] || "No Answer"}
                                <br />
                                Correct Answer: {question.answer}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="questions">
                    <h2>{questions[questionIndex].question}</h2>
                    <div className="options">
                        {questions[questionIndex].options.map((option, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => handleOptionClick(option)}
                                type={"radio"}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {questionIndex < questions.length - 1 ? (
                        <button onClick={nextQuestion}>Next</button>
                    ) : (
                        <button onClick={calculateScore}>Submit</button>
                    )}
                </div>
            )}
        </div>
    );
};
export default Quiz;
