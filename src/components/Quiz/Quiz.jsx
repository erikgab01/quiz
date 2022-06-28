import React, { useState, useEffect } from "react";
import Question from "../Question/Question";
import styles from "./Quiz.module.css";
import { nanoid } from "nanoid";

export default function Quiz(props) {
    const [questions, setQuestions] = useState([]);
    const [gameEnded, setGameEnded] = useState(false);
    const [correctQuestions, setCorrectQuestions] = useState(0);

    useEffect(() => {
        let category = props.categoryId !== 0 ? `&category=${props.categoryId}` : "";
        fetch(`https://opentdb.com/api.php?amount=${props.amount}${category}`)
            .then((response) => response.json())
            .then((data) => {
                let questions = data.results.map((question) => {
                    let answerList = [...question.incorrect_answers, question.correct_answer];
                    let answers = answerList.map((answer) => {
                        return { id: nanoid(), title: answer, selected: false };
                    });
                    shuffleArray(answers);
                    return {
                        id: nanoid(),
                        question: question.question,
                        correctAnswer: question.correct_answer,
                        answers: answers,
                    };
                });
                console.log(questions);
                setQuestions(questions);
            });
    }, [props.amount, props.categoryId]);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

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
                <>
                    <p>
                        You scored {correctQuestions}/{questions.length} correct answers
                    </p>
                    <button onClick={props.playAgain} className={styles.checkButton + " btn"}>
                        Play again
                    </button>
                </>
            )}
        </div>
    );
}
