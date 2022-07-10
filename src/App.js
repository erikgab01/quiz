import React, { useState } from "react";
import Quiz from "./components/Quiz/Quiz";
import Welcome from "./components/Welcome/Welcome";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [settings, setSettings] = useState({ category: 0, amount: 5 });

    return (
        <QueryClientProvider client={queryClient}>
            {quizStarted ? (
                <Quiz
                    amount={settings.amount}
                    categoryId={settings.category}
                    playAgain={() => setQuizStarted(false)}
                />
            ) : (
                <Welcome
                    settings={settings}
                    setSettings={setSettings}
                    setQuizState={() => setQuizStarted(true)}
                />
            )}
        </QueryClientProvider>
    );
}

export default App;
