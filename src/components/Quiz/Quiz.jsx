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
                    return { ...question, id: nanoid() };
                });
                setQuestions(questions);
            });
    }, []);

    return (
        <div className={styles.quiz}>
            {questions.map((question) => (
                <Question
                    key={question.id}
                    type={question.type}
                    question={question.question}
                    correctAnswer={question.correct_answer}
                    incorrectAnswers={question.incorrect_answers}
                />
            ))}
            <button className={styles.checkButton + " btn"}>Check answers</button>
        </div>
    );
}
