import { createContext, useState } from "react";

export const QuizContxt = createContext();

export const QuizProviderFn = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);


    return <QuizContxt.Provider value={{
        showResult, setShowResult,
        questions,
        setQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        showResult,
        setShowResult,
        incorrectQuestions,
        setIncorrectQuestions,
        score, setScore
    }}>
        {children}
    </QuizContxt.Provider>
}