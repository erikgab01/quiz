import React, { useState } from "react";
import styles from "./Question.module.css";
import { nanoid } from "nanoid";

export default function Question(props) {
    const [answers, setAnswers] = useState(getAnswerList());
    const entities = {
        "&#039;": "'",
        "&quot;": '"',
        // add more if needed
    };
    function setSelected(event, id) {
        setAnswers((prevValues) => {
            return prevValues.map((answer) =>
                answer.id === id ? { ...answer, selected: !answer.selected } : { ...answer, selected: false }
            );
        });
    }
    function getAnswerList() {
        const AnswerArray = [...props.incorrectAnswers];
        AnswerArray.push(props.correctAnswer);
        let AnswerObjects = AnswerArray.map((answer) => {
            return { title: answer, selected: false, id: nanoid() };
        });
        return AnswerObjects;
    }
    return (
        <div className={styles.question}>
            <h3 className={styles.title}>{props.question.replace(/&#?\w+;/g, (match) => entities[match])}</h3>
            <div className={styles.options}>
                {answers.map((answer) => (
                    <button
                        key={answer.id}
                        onClick={(event) => setSelected(event, answer.id)}
                        className={answer.selected ? styles.active : ""}
                    >
                        {answer.title.replace(/&#?\w+;/g, (match) => entities[match])}
                    </button>
                ))}
            </div>
        </div>
    );
}
