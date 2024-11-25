import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Load questions from the JSON file
  useEffect(() => {
    fetch("/src/questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        {showScore ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Quiz Finished!</h1>
            <p className="text-lg mt-4">Your score: {score}/{questions.length}</p>
            <button
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
              onClick={resetQuiz}
            >
              Restart Quiz
            </button>
          </div>
        ) : questions.length > 0 ? (
          <div>
            <h1 className="text-xl font-bold mb-4">
              {questions[currentQuestion].question}
            </h1>
            <div>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full mb-3 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </div>
  );
};

export default App;
