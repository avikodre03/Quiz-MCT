import React, { useContext, useState } from 'react'
import './QuestionComp.css'
import { QuizContxt } from '../Context/Context';
const QuestionComp = ({ question, handleAnswer }) => {
    const [selectedOption, setSelectedOption] = useState(null);

const {currentQuestionIndex}=useContext(QuizContxt)

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setTimeout(() => {
            handleAnswer(option, question.correct);
            setSelectedOption(null);
        }, 2000);
    };

    return (
        <div className="QuestionComp">
            <h2>Current Score: {question.currentScore}</h2>
            <div className="question-container">
          
            <h3>Question {currentQuestionIndex+1} out of 5</h3>
            <h2>{question.question}</h2>
            <ul>
                {question.options.map((option, index) => (
                    <li
                        key={index}
                        className={selectedOption === option ? 'selected' : ''}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
            {selectedOption && (
                <div className="answer-feedback">
                    Correct Answer: {question.correct}
                </div>
            )}
        </div>
        </div>
        
    );
}

export default QuestionComp