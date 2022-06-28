import React, { useState } from "react";
import Quiz from "./components/Quiz/Quiz";
import Welcome from "./components/Welcome/Welcome";

function App() {
    const [quizState, setQuizState] = useState(false);
    return (
        <div>
            {!quizState && <Welcome setQuizState={() => setQuizState(true)} />}
            {quizState && <Quiz />}
        </div>
    );
}

export default App;
