import React, { useState } from "react";
import styles from "./Question.module.css";

export default function Question(props) {
    const [questionList, setQuestionList] = useState(getQuestionList());
    function getQuestionList() {
        const questions = [...props.incorrectAnswers];
        questions.push(props.correctAnswer);
        return questions;
    }
    return (
        <div className={styles.question}>
            <h3 className={styles.title}>{props.question}</h3>
            <div className={styles.options}>
                {questionList.map((question) => (
                    <button>{question}</button>
                ))}
            </div>
        </div>
    );
}
