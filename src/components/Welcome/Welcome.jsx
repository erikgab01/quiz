import React, { useEffect, useState } from "react";
import styles from "./Welcome.module.css";
import { useLoading } from "react-use-loading";

export default function Welcome(props) {
    const [{ isLoading }, { stop }] = useLoading(true);
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then((response) => response.json())
            .then((data) => {
                setCategoryList(data.trivia_categories);
                stop();
            });
    }, [stop]);
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
    return isLoading ? (
        <div></div>
    ) : (
        <section className={styles.welcome}>
            <h1 className={styles.title}>Quizzical</h1>
            <p className={styles.description}>A simple quiz game</p>
            <div className={styles.optionList}>
                <p>Options:</p>
                <label htmlFor="category">Select category</label>
                <select id="category" value={props.settings.category} onChange={handleChangeCategory}>
                    <option value={0}>Any</option>
                    {categoryList.map((category) => (
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
