import { useState } from "react";

const demoQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HyperTransfer Markup Language",
      "Home Tool Markup Language",
      "HighText Machine Language",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which tag is used to insert an image in HTML?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    correctAnswer: 0,
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["color", "backgroundColor", "bg-color", "background"],
    correctAnswer: 3,
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<hyper>"],
    correctAnswer: 1,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: 0,
  },
];

export default function Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="p-6 mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md border dark:border-gray-700">
      <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-8">
        Quiz
      </h2>

      {demoQuestions.map((q, qIndex) => (
        <div key={qIndex} className="mb-8">
          <p className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
            {qIndex + 1}. {q.question}
          </p>
          <div className="space-y-3">
            {q.options.map((option, optIndex) => {
              const isSelected = selectedAnswers[qIndex] === optIndex;
              const isCorrect = submitted && optIndex === q.correctAnswer;
              const isIncorrect =
                submitted && isSelected && optIndex !== q.correctAnswer;

              return (
                <label
                  key={optIndex}
                  className={`block px-6 py-3 border rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 dark:bg-gray-800"
                      : "border-gray-300 dark:border-gray-700"
                  } ${
                    isCorrect
                      ? "bg-green-100 border-green-500 dark:border-green-500/50 dark:bg-green-800/20"
                      : isIncorrect
                      ? "bg-red-100 border-red-500 dark:border-red-500/50 dark:bg-red-800/20"
                      : ""
                  } text-gray-800 dark:text-gray-200`}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    className="mr-3"
                    checked={isSelected}
                    onChange={() => handleSelect(qIndex, optIndex)}
                    disabled={submitted}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Quiz
        </button>
      ) : (
        <p className="text-green-600 dark:text-green-400 mt-6 font-medium">
          Quiz submitted! Correct answers are highlighted in green.
        </p>
      )}
    </div>
  );
}