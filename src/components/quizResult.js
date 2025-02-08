import React from 'react';
import Markdown from 'react-markdown';

const QuizResult = ({ questions, responses }) => {
    // Calculate the total correct answers
    const correctCount = questions.reduce((count, question) => {
        const userAnswerIds = Object.values(responses);
        const correctAnswer = question.options.find(opt => opt.is_correct);
        const userAnswer = question.options.find(opt => userAnswerIds.includes(opt.id));
        return count + (userAnswer?.id === correctAnswer?.id ? 1 : 0);
    }, 0);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-3/4">
                <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>

                {/* Display total correct answers */}
                <p className="text-lg font-semibold mb-4">
                    You got <span className="text-green-600">{correctCount}</span> out of <span className="text-blue-600">{questions.length}</span> questions correct!
                </p>

                {questions.map((question, index) => {
                    const userAnswerIds = Object.values(responses);
                    const correctAnswer = question.options.find(opt => opt.is_correct);
                    const userAnswer = question.options.find(opt => userAnswerIds.includes(opt.id));
                    const isCorrect = userAnswer?.id === correctAnswer?.id;

                    return (
                        <div
                            key={index}
                            className={`mb-4 p-4 border rounded-lg ${isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}`}
                        >
                            <h3 className="text-lg font-semibold"><strong>Question :</strong> {question.description}</h3>
                            <p>
                                <strong>Your Answer:</strong>{" "}
                                {userAnswer ? userAnswer.description : <span className="text-gray-500">Not Answered</span>}
                            </p>
                            <p>
                                <strong>Correct Answer:</strong>{" "}
                                {correctAnswer ? correctAnswer.description : "Not Available"}
                            </p>
                            <p>
                                <strong>Explanation:</strong>{" "}
                                {question.detailed_solution ? <Markdown>{question.detailed_solution}</Markdown> : "Not Available"}
                            </p>
                            <div>
                                <strong>Practice Material:</strong>{" "}
                                <div dangerouslySetInnerHTML={{ __html: question.reading_material.practice_material.content || "Not Available" }} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded my-4" onClick={() => window.location.reload()}>Exit window</button>
        </div>
    );
};

export default QuizResult;
