# STEMz Teacher Platform API Documentation

## Overview

The STEMz Teacher Platform API provides comprehensive backend services for managing educational content, users, classrooms, assignments, and collaborative learning features.

**Base URL**: `https://core-server-nine.vercel.app/api`

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### 🔐 Authentication (`/api/auth`)

#### Sign Up
- **POST** `/api/auth/signup`
- **Description**: Create a new user account
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "teacher|student",
    "gradeLevel": 5  // Required for students (1-6)
  }
  ```
- **Response**: `201` - User created successfully
- **Response**: `400` - Validation error or duplicate email

#### Login
- **POST** `/api/auth/login`
- **Description**: Authenticate user and get JWT token
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200` - Login successful with JWT token
- **Response**: `401` - Invalid credentials
- **Response**: `404` - User not found

#### Verify Token
- **POST** `/api/auth/verify`
- **Description**: Verify JWT token validity
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200` - Token valid
- **Response**: `403` - Invalid/expired token

---

### 👥 Users (`/api/users`)

#### Create User
- **POST** `/api/users/create`
- **Description**: Create a new user (admin function)
- **Body**:
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "password123",
    "role": "teacher|student",
    "gradeLevel": 4
  }
  ```

#### Get All Users
- **GET** `/api/users`
- **Description**: Retrieve all users
- **Response**: Array of user objects

#### Get User by ID
- **GET** `/api/users/id/:id`
- **Description**: Get user by MongoDB ObjectId
- **Response**: User object

#### Get User by Email
- **GET** `/api/users/email/:email`
- **Description**: Get user by email address
- **Response**: User object

#### Update User
- **PUT** `/api/users/id/:id`
- **Description**: Update user information
- **Body**: User object with updated fields

#### Delete User
- **DELETE** `/api/users/id/:id`
- **Description**: Delete user account

---

### 🏫 Classrooms (`/api/classrooms`)

#### Get All Classrooms
- **GET** `/api/classrooms`
- **Description**: Retrieve all classrooms
- **Response**: Array of classroom objects

#### Get Classroom by ID
- **GET** `/api/classrooms/:id`
- **Description**: Get specific classroom details
- **Response**: Classroom object with populated teacher and students

#### Create Classroom
- **POST** `/api/classrooms`
- **Description**: Create a new classroom
- **Body**:
  ```json
  {
    "name": "Grade 5 Science",
    "description": "Elementary science classroom",
    "teacherId": "teacher_object_id",
    "studentIds": ["student1_id", "student2_id"]
  }
  ```

#### Update Classroom
- **PUT** `/api/classrooms/:id`
- **Description**: Update classroom information
- **Body**: Classroom object with updated fields

#### Delete Classroom
- **DELETE** `/api/classrooms/:id`
- **Description**: Delete classroom

#### Get User Classrooms
- **GET** `/api/classrooms/user/getUserClassrooms`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get classrooms for authenticated user
- **Response**: Object with `enrolled` and `teaching` arrays

#### Enroll in Classroom
- **POST** `/api/classrooms/:id/enroll`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Enroll authenticated user in classroom

#### Unenroll from Classroom
- **POST** `/api/classrooms/:id/unenroll`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Remove authenticated user from classroom

#### Get Classroom Users
- **GET** `/api/classrooms/:id/users`
- **Description**: Get all users in a classroom
- **Response**: Object with `students` and `teacher` arrays

---

### 📚 Courses (`/api/courses`)

#### Get All Courses
- **GET** `/api/courses`
- **Description**: Retrieve all available courses
- **Response**: Array of course objects

#### Get Course by ID
- **GET** `/api/courses/:id`
- **Description**: Get specific course details
- **Response**: Course object

#### Create Course
- **POST** `/api/courses`
- **Description**: Create a new course
- **Body**:
  ```json
  {
    "name": "Introduction to Astronomy",
    "description": "Basic astronomy concepts",
    "lesson_1": true,
    "lesson_2": false,
    "ws_1": true,
    "quiz_1": false
  }
  ```

#### Update Course
- **PUT** `/api/courses/:id`
- **Description**: Update course information
- **Body**: Course object with updated fields

#### Delete Course
- **DELETE** `/api/courses/:id`
- **Description**: Delete course

---

### 📝 Assignments (`/api/assignments`)

#### Get Student Assignments
- **GET** `/api/assignments/my-assignments`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get assignments for authenticated student

#### Get Upcoming Assignments
- **GET** `/api/assignments/upcoming`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get upcoming assignments for authenticated user

#### Get Course Assignments
- **GET** `/api/assignments/course/:courseName`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get assignments for specific course

#### Get Classroom Assignments
- **GET** `/api/assignments/classroom/:classroomId`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get assignments for specific classroom

#### Get Teacher Assignments
- **GET** `/api/assignments/my-created`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get assignments created by authenticated teacher

#### Create Assignment
- **POST** `/api/assignments`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Create a new assignment
- **Body**:
  ```json
  {
    "physicalClassroomId": "classroom_id",
    "teacherId": "teacher_id",
    "title": "Astronomy Quiz",
    "description": "Test your astronomy knowledge",
    "course": "astronomy",
    "lesson": "lesson1",
    "activityTitle": "Solar System Basics",
    "activityType": "quiz",
    "maxPoints": 100,
    "dueDate": "2024-01-15T23:59:59Z"
  }
  ```

#### Update Assignment
- **PUT** `/api/assignments/:assignmentId`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Update assignment details

#### Delete Assignment
- **DELETE** `/api/assignments/:assignmentId`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Soft delete assignment (sets isActive to false)

#### Get Assignment by ID
- **GET** `/api/assignments/:assignmentId`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get specific assignment details

---

### 📊 Grades (`/api/grades`)

#### Get All Grades
- **GET** `/api/grades`
- **Description**: Retrieve all grades

#### Get Grade by ID
- **GET** `/api/grades/:id`
- **Description**: Get specific grade details

#### Create Grade
- **POST** `/api/grades`
- **Description**: Create a new grade entry
- **Body**:
  ```json
  {
    "student_user_id": "student_id",
    "worksheet_id": "assignment_id",
    "classroom_id": "classroom_id",
    "grade": "A",
    "time_to_complete": 30
  }
  ```

#### Update Grade
- **PUT** `/api/grades/:id`
- **Description**: Update grade information

#### Delete Grade
- **DELETE** `/api/grades/:id`
- **Description**: Delete grade entry

#### Get Classroom Grades
- **GET** `/api/grades/classroom/:classroomId`
- **Description**: Get all grades for a classroom

---

### 📋 Worksheets (`/api/worksheets`)

#### Get All Worksheets
- **GET** `/api/worksheets`
- **Description**: Retrieve all worksheets

#### Get Worksheets by Course
- **GET** `/api/worksheets/course/:courseId`
- **Description**: Get worksheets for specific course

#### Get Worksheets by Classroom
- **GET** `/api/worksheets/classroom/:classroomId`
- **Description**: Get worksheets for specific classroom

#### Create Worksheet Progress
- **POST** `/api/worksheets/create`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Create worksheet progress entry
- **Body**:
  ```json
  {
    "userEmail": "student@example.com",
    "worksheetId": "worksheet_id",
    "progress": {
      "completed": true,
      "score": 85
    }
  }
  ```

#### Update Worksheet Progress
- **PUT** `/api/worksheets/update`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Update worksheet progress

---

### ❓ Questions (`/api/quizquestions` & `/api/bpqquestions`)

#### Get Quiz Questions
- **GET** `/api/quizquestions`
- **Description**: Get quiz questions with filters
- **Query Parameters**:
  - `course_id`: Course identifier (required)
  - `grade`: Grade level (required)
- **Example**: `/api/quizquestions?course_id=astronomy&grade=k-2`

#### Get BPQ Questions
- **GET** `/api/bpqquestions`
- **Description**: Get Before, During, After questions
- **Query Parameters**:
  - `course_id`: Course identifier (required)
  - `grade`: Grade level (required)
  - `lesson_id`: Lesson identifier (required)
- **Example**: `/api/bpqquestions?course_id=chemistry&grade=5-6&lesson_id=lesson1`

---

### 🎯 User Points (`/api/points`)

#### Get User Points
- **GET** `/api/points`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get authenticated user's points and progress

#### Update User Points
- **POST** `/api/points`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Update user's entire points data

#### Update Activity Progress
- **PATCH** `/api/points/activity`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Update specific activity progress

#### Get Total Points
- **GET** `/api/points/total`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get authenticated user's total points

#### Get User Total Points
- **GET** `/api/points/total/:userId`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get any user's total points

#### Reset User Points
- **DELETE** `/api/points/reset/:userId`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Reset user's points (admin function)

---

### 👥 Study Groups (`/api/studygroups`)

#### Create Study Group
- **POST** `/api/studygroups`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Create a new study group
- **Body**:
  ```json
  {
    "classroomId": "classroom_id",
    "name": "Astronomy Study Group",
    "description": "Study group for astronomy course",
    "userIds": ["user1_id", "user2_id", "user3_id"]
  }
  ```

#### Get Study Group by ID
- **GET** `/api/studygroups/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get specific study group details

#### Get Study Groups by Classroom
- **GET** `/api/studygroups/classroom/:classroomId`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get all study groups for a classroom

#### Update Study Group
- **PUT** `/api/studygroups/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Update study group information

#### Delete Study Group
- **DELETE** `/api/studygroups/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Delete study group

---

### 💬 Group Messages (`/api/group-messages`)

#### Get Messages by Study Group
- **GET** `/api/group-messages/studygroup/:studyGroupId`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get all messages for a study group
- **Query Parameters**:
  - `limit`: Number of messages to retrieve (default: 50)
  - `offset`: Number of messages to skip (default: 0)

#### Send Message
- **POST** `/api/group-messages`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Send a message to a study group
- **Body**:
  ```json
  {
    "studyGroupId": "study_group_id",
    "content": "Hello everyone! Let's discuss the solar system."
  }
  ```

#### Update Message
- **PUT** `/api/group-messages/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Update a message (only by sender)

#### Delete Message
- **DELETE** `/api/group-messages/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Delete a message (only by sender)

---

## Data Models

### User
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "String (hashed)",
  "role": "student|teacher",
  "gradeLevel": "Number (1-6, for students)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Classroom
```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String",
  "teacherId": "ObjectId (ref: User)",
  "studentIds": ["ObjectId (ref: User)"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Assignment
```json
{
  "_id": "ObjectId",
  "physicalClassroomId": "ObjectId (ref: Classroom)",
  "teacherId": "ObjectId (ref: User)",
  "title": "String",
  "description": "String",
  "course": "astronomy|chemistry|circuits|psychology|zoology|biochemistry|environmentalScience",
  "lesson": "String",
  "activityTitle": "String",
  "activityType": "quiz|worksheet|video",
  "maxPoints": "Number",
  "dueDate": "Date",
  "isActive": "Boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Study Group
```json
{
  "_id": "ObjectId",
  "classroomId": "ObjectId (ref: Classroom)",
  "name": "String",
  "description": "String",
  "userIds": ["ObjectId (ref: User)"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Group Message
```json
{
  "_id": "ObjectId",
  "studyGroupId": "ObjectId (ref: StudyGroup)",
  "userId": "ObjectId (ref: User)",
  "content": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## Error Responses

### Standard Error Format
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (invalid token)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **Authentication endpoints**: 5 requests per minute per IP
- **General endpoints**: 100 requests per minute per authenticated user
- **File upload endpoints**: 10 requests per minute per authenticated user

---

## WebSocket Support

The API supports WebSocket connections for real-time features:
- **Study Group Chat**: Real-time messaging in study groups
- **Live Notifications**: Real-time assignment and grade notifications
- **Collaborative Features**: Real-time collaboration tools

**WebSocket URL**: `ws://your-domain.com/socket.io/`

---

## SDKs and Libraries

### JavaScript/Node.js
```bash
npm install axios
```

### Python
```bash
pip install requests
```

### Example Usage (JavaScript)
```javascript
const axios = require('axios');

// Login
const loginResponse = await axios.post('/api/auth/login', {
  email: 'teacher@example.com',
  password: 'password123'
});

const token = loginResponse.data.token;

// Get assignments
const assignments = await axios.get('/api/assignments/my-created', {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

## Support

For API support and questions:
- **Documentation**: This file
- **Issues**: GitHub Issues
- **Email**: support@stemz.com

---

*Last updated: January 2025*
