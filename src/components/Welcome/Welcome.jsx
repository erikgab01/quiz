import React from "react";
import styles from "./Welcome.module.css";

export default function Welcome(props) {
    return (
        <section className={styles.welcome}>
            <h1 className={styles.title}>Quizzical</h1>
            <p className={styles.description}>Some description if needed</p>
            <button onClick={props.setQuizState} className={styles.startButton + " btn"}>
                Start quiz
            </button>
        </section>
    );
}
