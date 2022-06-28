import React, { useState } from "react";
import Quiz from "./components/Quiz/Quiz";
import Welcome from "./components/Welcome/Welcome";

function App() {
    const [quizState, setQuizState] = useState(false);
    const [settings, setSettings] = useState({ category: 0, amount: 5 });

    return (
        <div>
            {!quizState && (
                <Welcome
                    settings={settings}
                    setSettings={setSettings}
                    setQuizState={() => setQuizState(true)}
                />
            )}
            {quizState && (
                <Quiz
                    amount={settings.amount}
                    categoryId={settings.category}
                    playAgain={() => setQuizState(false)}
                />
            )}
        </div>
    );
}

export default App;
