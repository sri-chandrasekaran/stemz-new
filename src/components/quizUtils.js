/**
 * Quiz mapping configuration
 * Maps quiz pages to their respective course and lesson keys
 */

const QUIZ_MAPPING = {
    // Astronomy
    'astroquiz': {
      courseKey: 'astronomy',
      lessonNumber: 'lesson4',
      src: '/assets/astroquiz.json'
    },
    
    // Basics of Coding
    'codingquiz': {
      courseKey: 'basicsOfCoding',
      lessonNumber: 'lesson4',
      src: '/assets/codingquiz.json'
    },
    
    // Biochemistry
    'biochemistryquiz': {
      courseKey: 'biochemistry',
      lessonNumber: 'lesson2',
      src: '/assets/biochemistryquiz.json'
    },
    
    // Chemistry
    'chemistryquiz': {
      courseKey: 'chemistry',
      lessonNumber: 'lesson4',
      src: '/assets/chemistryquiz.json'
    },
    
    // Circuits
    'circuitquiz': {
      courseKey: 'circuits',
      lessonNumber: 'lesson3',
      src: '/assets/circuitquiz.json'
    },
    
    // Environmental Science
    'environmentalquiz': {
      courseKey: 'environmentalScience',
      lessonNumber: 'lesson4',
      src: '/assets/environmentalquiz.json'
    },
    
    // Psychology
    'psychologyquiz': {
      courseKey: 'psychology',
      lessonNumber: 'lesson4',
      src: '/assets/psychologyquiz.json'
    },
    
    // Statistics
    'statisticsquiz': {
      courseKey: 'statistics',
      lessonNumber: 'lesson5',
      src: '/assets/statisticsquiz.json'
    },
    
    // Zoology
    'zoologyquiz': {
      courseKey: 'zoology',
      lessonNumber: 'lesson5',
      src: '/assets/zoologyquiz.json'
    }
  };
  
  /**
   * Get quiz configuration by page name
   * @param {string} quizPage - The quiz page identifier (e.g., 'astroquiz')
   * @returns {Object|null} The quiz configuration or null if not found
   */
  export const getQuizConfig = (quizPage) => {
    return QUIZ_MAPPING[quizPage] || null;
  };
  
  /**
   * Parse quiz JSON structure
   * This function normalizes different quiz JSON formats to ensure
   * all required fields are present
   * 
   * @param {Object} quizData - The raw quiz data from JSON file
   * @returns {Object} Normalized quiz data
   */
  export const parseQuizData = (quizData) => {
    // Ensure questions array exists
    const questions = quizData.questions || [];
    
    // Normalize questions to ensure all have required fields
    const normalizedQuestions = questions.map(q => ({
      question: q.question || '',
      options: q.options || [],
      correctAnswerIndex: q.correctAnswerIndex ?? 0,
      score: q.score || 1 // Default score value if not specified
    }));
    
    return {
      title: quizData.title || 'Quiz',
      questions: normalizedQuestions,
      total: quizData.total || questions.length,
      maxPoints: quizData.maxPoints || 5, // Regular max points
      extraPoints: quizData.extraPoints || 5 // Bonus points for perfect score
    };
  };
  
  export default {
    getQuizConfig,
    parseQuizData
  };