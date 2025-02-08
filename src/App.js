import React, { useEffect, useState } from 'react';
import Quiz from './components/quiz.js';
import QuizResult from './components/quizResult.js';
import FullScreenHandler from './components/fullScreenHandler.js';
import { fetchQuizData } from './Services/api.js';

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [totalTimeLeft, setTotalTimeLeft] = useState(100); // 10 minutes in seconds
  const [responses, setResponses] = useState({});
  const [quizEnded, setQuizEnded] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuizData('Uw5CrX');
      console.log("Fetched Questions:", data); // Debugging output
      setQuestions(data || []);

      const savedResponses = JSON.parse(localStorage.getItem('responses'));
      const savedActiveQuestionIndex = JSON.parse(localStorage.getItem('activeQuestionIndex'));
      const savedTotalTimeLeft = JSON.parse(localStorage.getItem('totalTimeLeft'));

      if (savedResponses) setResponses(savedResponses);
      if (savedActiveQuestionIndex !== null) setActiveQuestionIndex(savedActiveQuestionIndex);
      if (savedTotalTimeLeft !== null) setTotalTimeLeft(savedTotalTimeLeft);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let timer;
    if (timerStarted) {
      timer = setInterval(() => {
        setTotalTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleQuizSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
      localStorage.setItem('responses', JSON.stringify(responses));
      localStorage.setItem('activeQuestionIndex', JSON.stringify(activeQuestionIndex));
      localStorage.setItem('totalTimeLeft', JSON.stringify(totalTimeLeft));
    };
  }, [timerStarted, activeQuestionIndex, responses, totalTimeLeft]);

  const openQuiz = () => {
    const appElement = document.documentElement;
    if (appElement.requestFullscreen) {
      appElement.requestFullscreen();
      setIsFullScreen(true);
      setTimerStarted(true);
    }
  };

  const handleQuizSubmit = () => {
    setQuizEnded(true);
    localStorage.clear();
  };

  if (!isFullScreen) {
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Quiz Instructions</h1>
        <p className="text-gray-700 mb-2">Please read the instructions carefully before starting the quiz:</p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>You must complete the quiz within the allotted time.</li>
          <li>Switching Tabs are allowed if you do so then test will automatically submit</li>
          <li>Do not refresh or leave the page during the quiz.</li>
          <li>Each question has only one correct answer.</li>
          <li>Ensure a stable internet connection.</li>
          <li>Don't click ESC button as it will automatically submit quiz</li>
        </ul>
        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            id="agree" 
            checked={agreed} 
            onChange={() => setAgreed(!agreed)}
            className="mr-2"
          />
          <label htmlFor="agree" className="text-gray-700">I have read and agree to the instructions</label>
        </div>
        <button 
          className={`w-full py-2 rounded text-white ${agreed ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`} 
          onClick={openQuiz} 
          disabled={!agreed}
        >
          Start Quiz
        </button>
      </div>
    </div>
    );
  }

  return (
    <>
      <FullScreenHandler setIsFullScreen={setIsFullScreen} setTimerStarted={setTimerStarted} handleQuizSubmit={handleQuizSubmit} />
      {quizEnded ? (
        <QuizResult questions={questions} responses={responses} />
      ) : (
        <Quiz
          questions={questions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          totalTimeLeft={totalTimeLeft}
          responses={responses}
          setResponses={setResponses}
          handleQuizSubmit={handleQuizSubmit}
        />
      )}
    </>
  );
};

export default App;
