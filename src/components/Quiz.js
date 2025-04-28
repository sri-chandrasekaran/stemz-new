import React, { useState, useEffect } from 'react';
import './Quiz.css';
import './Form.css'
import PropTypes from 'prop-types';

const Quiz = ({ src }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [total, setTotal] = useState(0);
  let score = 0;
  useEffect(() => {
    // Fetch quiz data from the source URL
    fetch(src)
      .then(response => response.text())
      .then(data => {
        // Assuming the data is a JSON string
        setQuestions(JSON.parse(data)['questions']);
        setTotal(JSON.parse(data)['total']);
      })
      .catch(error => console.error('Error fetching quiz data:', error));
  }, [src]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="quiz-container">
      <h2>Quiz Section</h2>
      {questions.length > 0 ? (
        <form onSubmit={handleSubmit}>
          {questions.map((q, questionIndex) => (
            <div key={questionIndex} className="quiz-question">
              <p>{q.question}</p>
              {q.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === q.correctAnswerIndex;
                const isSelected = selectedAnswers[questionIndex] === optionIndex;
                const isIncorrect = isSelected && !isCorrect;
                if (isCorrect && isSelected) {
                  score += q.score;
                }
                
                return (
                  <label
                    key={optionIndex}
                    style={{
                      backgroundColor: showResults
                        ? isCorrect
                          ? 'lightgreen'
                          : isIncorrect
                          ? 'salmon'
                          : 'transparent'
                        : 'transparent',
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={optionIndex}
                      onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                      disabled={showResults}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          ))}
          {!showResults && <button type="submit">Submit Answers</button>}
        </form>
      ) : (
        <p>Quiz Load Error</p>
      )}
      {showResults && <div> Your score is {score} out of {total} (which is {Math.round(score * 100 / total, 2)} %).</div>}
    </div>
  );
};

Quiz.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Quiz;
