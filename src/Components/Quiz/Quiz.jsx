import React, { useEffect, useState } from 'react'
import questionData from '../QuestionData/QuestionsData'
import './Quiz.css'
const Quiz = () => {

    const [randomOrderquestion, setrandomOrderquestion] = useState([])
    const [currentIndex, setcurrentIndex] = useState(0)
    const [selectedOption, setselectedOption] = useState(null)
    const [inCorrectquestion, setinCorrectquestion] = useState([])
    const [score, setscore] = useState(0)
    const [result, setresult] = useState(false)

    useEffect(() => {
        RestartQuiz()
    }, [])

    const RestartQuiz = () => {
        const ShuffleData = questionData.map((ele) => ({ ele, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map((ele) => ele.ele)

        setrandomOrderquestion(ShuffleData)
        setscore(0)
        setcurrentIndex(0)
        setresult(false)
        setinCorrectquestion([])
    }

    const handleClickOption = (option) => {
        setselectedOption(option)

        setTimeout(() => {
            setselectedOption(null)
            handleAnswer(option)

            if (currentIndex < randomOrderquestion.length - 1) {
                setcurrentIndex((pev) => pev + 1)
            } else {
                setresult(true)
            }
        }, 2000);
    }

    const handleAnswer = (option) => {
        if (option === randomOrderquestion[currentIndex].correct) {
            setscore((prev) => prev + 5)
        } else {
            setinCorrectquestion([...inCorrectquestion, randomOrderquestion[currentIndex]])
            console.log(inCorrectquestion);
        }
    }

    return (
        <div className='quiz-container'>
            <h1>USA Quiz</h1>


            {result ? <>
                <div className='result-container'>
                    <h4>final result</h4>
                    <h3>Your score: {score}</h3>
                    <p>Incorrect questions-</p>
                    {inCorrectquestion && inCorrectquestion.map((ele) => {
                        return <div>
                            <p><strong>Q. </strong>{ele.question}</p>
                            <p><strong>Correct ans. </strong> <span>{ele.correct}</span></p>
                        </div>
                    })}
                    <button onClick={RestartQuiz}>RestartQuiz</button>
                </div>
            </>
                :
                (randomOrderquestion.length > 0 &&
                    <>
                        <div className='question-container'>
                            <h2>Current Score: {score}</h2>
                            <h3>queston {currentIndex + 1} out of 5</h3>
                            <h3 id='question'>{randomOrderquestion[currentIndex].question}</h3>

                            <ul>
                                {randomOrderquestion[currentIndex].options.map((ele, idx) => {
                                    return <>
                                        <li key={idx}
                                            onClick={() => handleClickOption(ele)} >
                                            {ele}
                                        </li>
                                    </>
                                })}

                            </ul>

                            {selectedOption && <div className='correct-answer'>
                                Correct Answer: {randomOrderquestion[currentIndex].correct}
                            </div>}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Quiz