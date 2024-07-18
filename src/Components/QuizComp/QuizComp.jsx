import React, { useContext, useEffect, useState } from 'react'
import './QuizComp.css'
import questionData from '../QuestionData/QuestionsData.js';
import { QuizContxt } from '../Context/Context.js'
import QuestionComp from '../QuestionComp/QuestionComp.jsx';
import ResultComp from '../ResultComp/ResultComp.jsx';
const QuizComp = () => {

   
    const [questionsAnswered, setQuestionsAnswered] = useState(0);

    const {
        questions,
        setQuestions,
        currentQuestionIndex, setCurrentQuestionIndex,
        showResult, setShowResult,
        incorrectQuestions, setIncorrectQuestions,
        score, setScore
    } = useContext(QuizContxt);


    useEffect(() => {
        resetQuiz();
    }, []);

    const resetQuiz = () => {
        const shuffledQuestions = questionData.map(question => ({
            ...question,
            currentScore: 0
        })).sort(() => Math.random() - 0.5);

        setQuestions(shuffledQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setIncorrectQuestions([]);
        setShowResult(false);
        setQuestionsAnswered(0);
    };

    const handleAnswer = (selectedOption, correctAnswer) => {
        const currentQuestion = questions[currentQuestionIndex];

        if (!currentQuestion) {
            console.error('Current question is undefined or null');
            return;
        }

        if (selectedOption === correctAnswer) {

            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestionIndex].currentScore += 5;
            setQuestions(updatedQuestions);
            setScore(score + 5);
        } else {

            setIncorrectQuestions([...incorrectQuestions, currentQuestion]);
        }

        setTimeout(() => {
            const nextQuestionIndex = currentQuestionIndex + 1;
            if (nextQuestionIndex < questions.length) {
                setCurrentQuestionIndex(nextQuestionIndex);
                setQuestionsAnswered(questionsAnswered + 1);
            } else {
                setShowResult(true);
            }
        }, 2000);
    };


    return (
        <div className="QuizComp">
            <h1>USA Quiz</h1>
            {showResult ? (
                <ResultComp resetQuiz={resetQuiz} />
            ) : (
                questions.length > 0 &&
                <QuestionComp
                    question={questions[currentQuestionIndex]}
                    handleAnswer={handleAnswer}
                  
                />
            )}
        </div>
    );
}

export default QuizComp