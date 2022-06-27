import React, { useState } from "react";
import Question from "../Question/Question";
import styles from "./Quiz.module.css";

export default function Quiz() {
    const [questions, setQuestions] = useState([
        {
            id: 1,
            type: "multiple",
            question: "How would one say goodbye in Spanish?",
            correct_answer: "Adiós",
            incorrect_answers: ["Hola", "Au Revoir", "Salir"],
        },
        {
            id: 2,
            type: "multiple",
            question: "How would one say goodbye in Japanese?",
            correct_answer: "Sayounara",
            incorrect_answers: ["Hola", "Au Revoir", "Salir"],
        },
        {
            id: 3,
            type: "multiple",
            question: "How would one say goodbye in Japanese?",
            correct_answer: "Sayounara",
            incorrect_answers: ["Hola", "Au Revoir", "Salir"],
        },
        {
            id: 4,
            type: "multiple",
            question: "How would one say goodbye in Japanese?",
            correct_answer: "Sayounara",
            incorrect_answers: ["Hola", "Au Revoir", "Salir"],
        },
        {
            id: 5,
            type: "multiple",
            question: "How would one say goodbye in Japanese?",
            correct_answer: "Sayounara",
            incorrect_answers: ["Hola", "Au Revoir", "Salir"],
        },
    ]);
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
