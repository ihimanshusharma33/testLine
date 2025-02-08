import { useEffect, useState } from "react";

const Quiz = ({
    questions,
    activeQuestionIndex,
    setActiveQuestionIndex,
    totalTimeLeft,
    responses,
    setResponses,
    handleQuizSubmit,
}) => {
    // ✅ Move hooks to the top
    const [timeLeft, setTimeLeft] = useState(totalTimeLeft);

    useEffect(() => {
        if (timeLeft <= 0) {
            alert("Time is up! Submitting your quiz.");
            handleQuizSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]); // Run only when timeLeft changes

    // ✅ After hooks, return early if necessary
    if (!questions || questions.length === 0) {
        return <p className="text-center text-xl">Loading questions...</p>;
    }

    const handleAnswerSelect = (option) => {
        setResponses({ ...responses, [activeQuestionIndex]: option });
    };

    const handleNext = () => {
        if (activeQuestionIndex < questions.length - 1) {
            setActiveQuestionIndex(activeQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (activeQuestionIndex > 0) {
            setActiveQuestionIndex(activeQuestionIndex - 1);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between">
                <p className={`text-lg font-bold ${timeLeft <= 60 ? "text-red-600" : "text-black"}`}>
                    Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </p>
                <p className="text-xl font-semibold">
                    Question {activeQuestionIndex + 1} / {questions.length}
                </p>
            </div>

            <div className="mt-6 bg-white p-4 rounded-lg">
                <h2 className="text-2xl font-bold">{questions[activeQuestionIndex].description}</h2>
                <ul className="mt-4">
                    {questions[activeQuestionIndex].options.map((option, index) => (
                        <li key={index}>
                            <button
                                className={`block w-1/2 ml-6 p-2 border  mt-2 ${responses[activeQuestionIndex] === option.id ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                                onClick={() => handleAnswerSelect(option.id)}
                            >
                                {option.description}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
                    onClick={handlePrevious}
                    disabled={activeQuestionIndex === 0}
                >
                    Previous
                </button>

                {activeQuestionIndex < questions.length - 1 ? (
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={handleQuizSubmit}
                    >
                        Submit Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

export default Quiz;
