import { useQuery } from "react-query";
import fetchData from "../utility/fetchData";
import { nanoid } from "nanoid";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function useQuestions(amount, categoryId, setQuestions) {
    let category = categoryId !== 0 ? `&category=${categoryId}` : "";
    return useQuery(["questions"], async () => {
        const data = await fetchData(`https://opentdb.com/api.php?amount=${amount}${category}`);
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
        setQuestions(questions);
        return questions;
    });
}

export default useQuestions;
