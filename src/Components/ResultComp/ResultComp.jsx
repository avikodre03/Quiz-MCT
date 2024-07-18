import React, { useContext } from 'react'
import './ResultComp.css'
import { QuizContxt } from '../Context/Context';

const ResultComp = ({ resetQuiz }) => {
    const {score,incorrectQuestions}=useContext(QuizContxt);
    return (
        <div className="result-container">
          <h2>Quiz Completed</h2>
          <p>Your Score: {score}</p>
          <h3>Incorrect Questions:</h3>
          <ul>
            {incorrectQuestions.map((question, index) => (
              <li key={index}>
                <strong>Q:</strong> {question.question}<br />
                <strong>Correct Answer:</strong> <span>{question.correct}</span>
              </li>
            ))}
          </ul>
          <button onClick={resetQuiz}>Restart Quiz</button>
        </div>
      );
}

export default ResultComp