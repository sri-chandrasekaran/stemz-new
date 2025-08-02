// src/utils/RouteMapping.js
// Updated to match your existing route structure exactly

const COURSE_ROUTE_MAPPING = {
    astronomy: {
      lesson1: {
        video: "/astrovid1s",
        worksheet: "/astroworksheet1", 
        quiz: "/astroquiz"
      },
      lesson2: {
        video: "/astrovid2s",
        worksheet: "/astroworksheet2",
        quiz: "/astroquiz"
      },
      lesson3: {
        video: "/astrovid3s", 
        worksheet: "/astroworksheet1",
        quiz: "/astroquiz"
      },
      lesson4: {
        video: "/astrovid4s",
        worksheet: "/astroworksheet2", 
        quiz: "/astroquiz"
      }
    },
  
    basicsOfCoding: {
      lesson1: {
        video: "/bc1s",
        worksheet: "/bc1p",
        quiz: "/bcquiz"
      },
      lesson2: {
        video: "/bc2s",
        worksheet: "/bc2p", 
        quiz: "/bcquiz"
      },
      lesson3: {
        video: "/bc3s",
        worksheet: "/bc3p",
        quiz: "/bcquiz"
      },
      lesson4: {
        video: "/bc4s",
        worksheet: "/bc4p",
        quiz: "/bcquiz"
      }
    },
  
    biochemistry: {
      lesson1: {
        video: "/biochem1",
        worksheet: "/biochemworksheet",
        quiz: "/biochemquiz"
      },
      lesson2: {
        video: "/biochem2", 
        worksheet: "/biochemworksheet",
        quiz: "/biochemquiz"
      }
    },
  
    chemistry: {
      lesson1: {
        video: "/chem1",
        worksheet: "/chem1",
        quiz: "/chemquiz"
      },
      lesson2: {
        video: "/chem2",
        worksheet: "/chem2", 
        quiz: "/chemquiz"
      },
      lesson3: {
        video: "/chem3",
        worksheet: "/chem3",
        quiz: "/chemquiz"
      },
      lesson4: {
        video: "/chem4",
        worksheet: "/chem4",
        quiz: "/chemquiz"
      }
    },
  
    circuits: {
      lesson1: {
        video: "/circuit1s",
        worksheet: "/circuitworksheet",
        quiz: "/circuitquiz"
      },
      lesson2: {
        video: "/circuit2s",
        worksheet: "/circuitworksheet", 
        quiz: "/circuitquiz"
      },
      lesson3: {
        video: "/circuit3s",
        worksheet: "/circuitworksheet",
        quiz: "/circuitquiz"
      }
    },
  
    environmentalScience: {
      lesson1: {
        video: "/es1s",
        worksheet: "/esworksheet1",
        quiz: "/esquiz"
      },
      lesson2: {
        video: "/es2s",
        worksheet: "/esworksheet1",
        quiz: "/esquiz"
      },
      lesson3: {
        video: "/es3s",
        worksheet: "/esworksheet1", 
        quiz: "/esquiz"
      },
      lesson4: {
        video: "/es4s",
        worksheet: "/esworksheet1",
        quiz: "/esquiz"
      }
    },
  
    psychology: {
      lesson1: {
        video: "/psych1s",
        worksheet: "/psychworksheet1",
        quiz: "/psychquiz"
      },
      lesson2: {
        video: "/psych2s",
        worksheet: "/psychworksheet2",
        quiz: "/psychquiz"
      },
      lesson3: {
        video: "/psych3s",
        worksheet: "/psychworksheet1",
        quiz: "/psychquiz"
      },
      lesson4: {
        video: "/psych4s",
        worksheet: "/psychworksheet2",
        quiz: "/psychquiz"
      }
    },
  
    statistics: {
      lesson1: {
        video: "/stat1s",
        worksheet: "/statworksheet1",
        quiz: "/statquiz"
      },
      lesson2: {
        video: "/stat2s", 
        worksheet: "/statworksheet2",
        quiz: "/statquiz"
      },
      lesson3: {
        video: "/stat3s",
        worksheet: "/statworksheet3",
        quiz: "/statquiz"
      },
      lesson4: {
        video: "/stat4s",
        worksheet: "/statworksheet1",
        quiz: "/statquiz"
      },
      lesson5: {
        video: "/stat5s",
        worksheet: "/statworksheet2",
        quiz: "/statquiz"
      }
    },
  
    zoology: {
      lesson1: {
        video: "/zoo1s",
        worksheet: "/zooworksheet1", 
        quiz: "/zooquiz"
      },
      lesson2: {
        video: "/zoo2s",
        worksheet: "/zooworksheet2",
        quiz: "/zooquiz"
      },
      lesson3: {
        video: "/zoo3s",
        worksheet: "/zooworksheet3",
        quiz: "/zooquiz"
      },
      lesson4: {
        video: "/zoo4s",
        worksheet: "/zooworksheet1",
        quiz: "/zooquiz"
      },
      lesson5: {
        video: "/zoo5s",
        worksheet: "/zooworksheet2",
        quiz: "/zooquiz"
      }
    }
  };
  
  /**
   * Parse assignment link and return actual route
   * @param {string} linkUrl - Backend format like '/astronomy/lesson1/quiz'
   * @returns {string|null} - Your actual route like '/astroquiz'
   */
  export const parseAssignmentLink = (linkUrl) => {
    if (!linkUrl || typeof linkUrl !== 'string') {
      return null;
    }
  
    // Remove leading slash and split
    const parts = linkUrl.replace(/^\//, '').split('/');
    
    if (parts.length !== 3) {
      console.warn(`Invalid link format: ${linkUrl}`);
      return null;
    }
  
    const [course, lesson, activityType] = parts;
    
    try {
      const courseMapping = COURSE_ROUTE_MAPPING[course];
      if (!courseMapping) {
        console.warn(`Course not found: ${course}`);
        return null;
      }
  
      const lessonMapping = courseMapping[lesson];
      if (!lessonMapping) {
        console.warn(`Lesson not found: ${lesson}`);
        return null;
      }
  
      const route = lessonMapping[activityType];
      if (!route) {
        console.warn(`Activity not found: ${activityType}`);
        return null;
      }
  
      return route;
    } catch (error) {
      console.error('Error parsing assignment link:', error);
      return null;
    }
  };
  
  /**
   * Get course display name
   */
  export const getCourseDisplayName = (course) => {
    const names = {
      astronomy: "Astronomy",
      basicsOfCoding: "Basics of Coding",
      biochemistry: "Biochemistry", 
      chemistry: "Chemistry",
      circuits: "Circuits",
      environmentalScience: "Environmental Science",
      psychology: "Psychology",
      statistics: "Statistics",
      zoology: "Zoology"
    };
    return names[course] || course;
  };
  
  /**
   * Get activity display name
   */
  export const getActivityDisplayName = (activityType) => {
    const names = {
      video: "Video Lesson",
      worksheet: "Worksheet", 
      quiz: "Quiz"
    };
    return names[activityType] || activityType;
  };
  
  /**
   * Get activity icon
   */
  export const getActivityIcon = (activityType) => {
    const icons = {
      video: "🎥",
      worksheet: "📝",
      quiz: "📊"
    };
    return icons[activityType] || "📚";
  };
  
  export default {
    parseAssignmentLink,
    getCourseDisplayName,
    getActivityDisplayName,
    getActivityIcon,
    COURSE_ROUTE_MAPPING
  };