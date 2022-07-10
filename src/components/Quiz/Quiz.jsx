import React, { useState } from "react";
import Question from "../Question/Question";
import styles from "./Quiz.module.css";
import useQuestions from "../../hooks/useQuestions";

export default function Quiz(props) {
    const [questions, setQuestions] = useState([]);
    const [gameEnded, setGameEnded] = useState(false);
    const [correctQuestions, setCorrectQuestions] = useState(0);

    const { status, error, isFetching } = useQuestions(props.amount, props.categoryId, setQuestions);
    console.log(isFetching);

    function setSelected(event, questionId, answerId) {
        setQuestions((oldQuestions) =>
            oldQuestions.map((question) =>
                question.id === questionId
                    ? {
                          ...question,
                          answers: question.answers.map((answer) =>
                              answer.id === answerId
                                  ? { ...answer, selected: !answer.selected }
                                  : { ...answer, selected: false }
                          ),
                      }
                    : question
            )
        );
    }

    function checkAnswers() {
        let correctQuestion = 0;
        questions.forEach((question) => {
            let correct = question.answers.find(
                (answer) => answer.selected && answer.title === question.correctAnswer
            );
            if (correct) {
                correctQuestion++;
            }
        });
        setCorrectQuestions(correctQuestion);
        setGameEnded(true);
    }
    // status === "success" is not used, as background refetching does not change status
    if (isFetching) {
        return <></>;
    }
    if (status === "error") {
        return <div className="error">Error: {error.message}</div>;
    }

    return (
        <div className={styles.quiz}>
            {questions.map((question) => (
                <Question
                    key={question.id}
                    id={question.id}
                    question={question.question}
                    correctAnswer={question.correctAnswer}
                    answers={question.answers}
                    setSelected={setSelected}
                    gameEnded={gameEnded}
                />
            ))}
            {!gameEnded ? (
                <button onClick={checkAnswers} className={styles.checkButton + " btn"}>
                    Check answers
                </button>
            ) : (
                <div className={styles.resultBlock}>
                    <p className={styles.result}>
                        You scored {correctQuestions}/{questions.length} correct answers
                    </p>
                    <button onClick={props.playAgain} className={styles.playAgainButton + " btn"}>
                        Play again
                    </button>
                </div>
            )}
        </div>
    );
}
