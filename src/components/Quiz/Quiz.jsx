import React, { useState, useEffect } from "react";
import Question from "../Question/Question";
import styles from "./Quiz.module.css";
import { nanoid } from "nanoid";

export default function Quiz() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=3")
            .then((response) => response.json())
            .then((data) => {
                let questions = data.results.map((question) => {
                    let answerList = [...question.incorrect_answers, question.correct_answer];
                    let answers = answerList.map((answer) => {
                        return { id: nanoid(), title: answer, selected: false };
                    });
                    return {
                        id: nanoid(),
                        question: question.question,
                        correctAnswer: question.correct_answer,
                        answers: answers,
                    };
                });
                setQuestions(questions);
            });
    }, []);

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
                />
            ))}
            <button className={styles.checkButton + " btn"}>Check answers</button>
        </div>
    );
}
