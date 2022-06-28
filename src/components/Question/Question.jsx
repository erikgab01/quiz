import React from "react";
import styles from "./Question.module.css";

export default function Question(props) {
    const entities = {
        "&#039;": "'",
        "&quot;": '"',
        "&amp;": "&",
        // add more if needed
    };
    return (
        <div className={styles.question}>
            <h3 className={styles.title}>
                {props.question.replace(/&#?\wv+;/g, (match) => entities[match])}
            </h3>
            <div className={styles.options}>
                {props.answers.map((answer) => (
                    <button
                        key={answer.id}
                        onClick={(event) => props.setSelected(event, props.id, answer.id)}
                        className={answer.selected ? styles.active : ""}
                    >
                        {answer.title.replace(/&#?\w+;/g, (match) => entities[match])}
                    </button>
                ))}
            </div>
        </div>
    );
}
