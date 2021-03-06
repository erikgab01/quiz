import React from "react";
import styles from "./Welcome.module.css";
import useCategories from "../../hooks/useCategories";

export default function Welcome(props) {
    const { status, data, error } = useCategories();
    function handleChangeCategory(event) {
        props.setSettings((oldSettings) => {
            return { ...oldSettings, category: event.target.value };
        });
    }
    function handleChangeAmount(event) {
        props.setSettings((oldSettings) => {
            return { ...oldSettings, amount: event.target.value };
        });
    }
    if (status === "loading") {
        return <></>;
    }
    if (status === "error") {
        return <div className="error">Error: {error.message}</div>;
    }
    return (
        <section className={styles.welcome}>
            <h1 className={styles.title}>Quizzical</h1>
            <p className={styles.description}>A simple quiz game</p>
            <div className={styles.optionList}>
                <p>Options:</p>
                <label htmlFor="category">Select category</label>
                <select id="category" value={props.settings.category} onChange={handleChangeCategory}>
                    <option value={0}>Any</option>
                    {data.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type="number"
                    min="1"
                    max="30"
                    value={props.settings.amount}
                    onChange={handleChangeAmount}
                />
            </div>
            <button onClick={props.setQuizState} className={styles.startButton + " btn"}>
                Start quiz
            </button>
        </section>
    );
}
