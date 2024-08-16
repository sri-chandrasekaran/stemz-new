// Quiz.js
import React, { useState, useEffect } from 'react';
import './Quiz.css';
import PropTypes from 'prop-types';

const Quiz = ({ src }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch quiz data from the source URL
    fetch(src)
      .then(response => response.text())
      .then(data => {
        // Assuming the data is a JSON string
        setQuestions(JSON.parse(data)['questions']);
      })
      .catch(error => console.error('Error fetching quiz data:', error));
  }, [src]);

  return (
    <div className="quiz-container">
      <h2>Quiz Section</h2>
      {questions.length > 0 ? (
        <form>
          {questions.map((q, index) => (
            <div key={index} className="quiz-question">
              <p>{q.question}</p>
              {q.options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    // Handle change if needed
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button type="submit">Submit Answers</button>
        </form>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

Quiz.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Quiz;
