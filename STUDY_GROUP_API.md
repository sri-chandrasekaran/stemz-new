# Study Group API Documentation

## Overview
The Study Group API allows users to create and manage collaborative study groups within physical classrooms. Students can form groups, manage memberships, and coordinate their learning activities.

## Authentication
🔒 **All endpoints require authentication** via JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Base URL
```
/api/studygroups
```

## Data Model

### StudyGroup Schema
```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  classroomId: ObjectId,            // Reference to PhysicalClassroom
  name: String,                     // Optional, max 120 characters
  memberUserIds: [ObjectId],        // Array of User references
  createdBy: ObjectId,              // User who created the group
  lastMessageAt: Date,              // Last message timestamp (nullable)
  isArchived: Boolean,              // Default: false
  createdAt: Date,                  // Auto-generated timestamp
  updatedAt: Date                   // Auto-generated timestamp
}
```

---

## API Endpoints

### 1. Create Study Group

**POST** `/api/studygroups/`

Creates a new study group within a physical classroom.

#### Request Body
```json
{
  "classroomId": "507f1f77bcf86cd799439011",
  "name": "Math Study Group",
  "memberUserIds": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
}
```

#### Validation Rules
- `classroomId` is **required**
- `memberUserIds` must be a **non-empty array**
- All user IDs must exist in the database
- All members must belong to the specified classroom
- The creator is automatically determined from the authenticated user or defaults to the first member

#### Success Response (201 Created)
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "classroomId": "507f1f77bcf86cd799439011",
  "name": "Math Study Group",
  "memberUserIds": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
  "createdBy": "507f1f77bcf86cd799439012",
  "lastMessageAt": null,
  "isArchived": false,
  "createdAt": "2026-01-19T10:30:00.000Z",
  "updatedAt": "2026-01-19T10:30:00.000Z"
}
```

#### Error Responses
- **400 Bad Request**: Missing required fields or invalid user IDs
- **404 Not Found**: Classroom not found
- **500 Internal Server Error**: Server error

---

### 2. Get Study Group by ID

**GET** `/api/studygroups/:id`

Retrieves a specific study group with populated member details.

#### URL Parameters
- `id` - Study group ID

#### Success Response (200 OK)
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "classroomId": "507f1f77bcf86cd799439011",
  "name": "Math Study Group",
  "memberUserIds": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "student"
    }
  ],
  "createdBy": "507f1f77bcf86cd799439012",
  "lastMessageAt": null,
  "isArchived": false,
  "createdAt": "2026-01-19T10:30:00.000Z",
  "updatedAt": "2026-01-19T10:30:00.000Z"
}
```

#### Error Responses
- **404 Not Found**: Study group not found
- **500 Internal Server Error**: Server error

---

### 3. Get Study Groups by Classroom

**GET** `/api/studygroups/classroom/:classroomId`

Retrieves all non-archived study groups for a specific classroom, sorted by most recently updated.

#### URL Parameters
- `classroomId` - Physical classroom ID

#### Success Response (200 OK)
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "classroomId": "507f1f77bcf86cd799439011",
    "name": "Math Study Group",
    "memberUserIds": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
    "createdBy": "507f1f77bcf86cd799439012",
    "lastMessageAt": "2026-01-19T15:30:00.000Z",
    "isArchived": false,
    "createdAt": "2026-01-19T10:30:00.000Z",
    "updatedAt": "2026-01-19T15:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439015",
    "classroomId": "507f1f77bcf86cd799439011",
    "name": "Science Study Group",
    "memberUserIds": ["507f1f77bcf86cd799439016", "507f1f77bcf86cd799439017"],
    "createdBy": "507f1f77bcf86cd799439016",
    "lastMessageAt": null,
    "isArchived": false,
    "createdAt": "2026-01-19T11:00:00.000Z",
    "updatedAt": "2026-01-19T11:00:00.000Z"
  }
]
```

#### Error Responses
- **500 Internal Server Error**: Server error

---

### 4. Get Current User's Study Groups

**GET** `/api/studygroups/`

Retrieves all non-archived study groups that the authenticated user is a member of, sorted by most recently updated.

#### Success Response (200 OK)
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "classroomId": "507f1f77bcf86cd799439011",
    "name": "Math Study Group",
    "memberUserIds": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
    "createdBy": "507f1f77bcf86cd799439012",
    "lastMessageAt": "2026-01-19T15:30:00.000Z",
    "isArchived": false,
    "createdAt": "2026-01-19T10:30:00.000Z",
    "updatedAt": "2026-01-19T15:30:00.000Z"
  }
]
```

#### Error Responses
- **500 Internal Server Error**: Server error

---

### 5. Update Members (Replace)

**PUT** `/api/studygroups/:id/members`

Replaces the entire member list of a study group.

#### URL Parameters
- `id` - Study group ID

#### Request Body
```json
{
  "memberUserIds": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439018"]
}
```

#### Validation Rules
- `memberUserIds` must be an array
- All user IDs must exist in the database

#### Success Response (200 OK)
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "classroomId": "507f1f77bcf86cd799439011",
  "name": "Math Study Group",
  "memberUserIds": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439018"],
  "createdBy": "507f1f77bcf86cd799439012",
  "lastMessageAt": null,
  "isArchived": false,
  "createdAt": "2026-01-19T10:30:00.000Z",
  "updatedAt": "2026-01-19T16:00:00.000Z"
}
```

#### Error Responses
- **400 Bad Request**: Invalid memberUserIds format or invalid user IDs
- **404 Not Found**: Study group not found
- **500 Internal Server Error**: Server error

---

### 6. Add Members

**POST** `/api/studygroups/:id/members`

Adds new members to an existing study group (does not remove existing members).

#### URL Parameters
- `id` - Study group ID

#### Request Body
```json
{
  "userIds": ["507f1f77bcf86cd799439019", "507f1f77bcf86cd799439020"]
}
```

#### Validation Rules
- `userIds` must be a **non-empty array**
- Duplicate user IDs are automatically handled (no duplicates in final list)

#### Success Response (200 OK)
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "classroomId": "507f1f77bcf86cd799439011",
  "name": "Math Study Group",
  "memberUserIds": [
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439018",
    "507f1f77bcf86cd799439019",
    "507f1f77bcf86cd799439020"
  ],
  "createdBy": "507f1f77bcf86cd799439012",
  "lastMessageAt": null,
  "isArchived": false,
  "createdAt": "2026-01-19T10:30:00.000Z",
  "updatedAt": "2026-01-19T16:15:00.000Z"
}
```

#### Error Responses
- **400 Bad Request**: userIds must be a non-empty array
- **404 Not Found**: Study group not found
- **500 Internal Server Error**: Server error

---

### 7. Remove Members

**DELETE** `/api/studygroups/:id/members`

Removes specified members from a study group.

#### URL Parameters
- `id` - Study group ID

#### Request Body
```json
{
  "userIds": ["507f1f77bcf86cd799439019"]
}
```

#### Validation Rules
- `userIds` must be a **non-empty array**

#### Success Response (200 OK)
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "classroomId": "507f1f77bcf86cd799439011",
  "name": "Math Study Group",
  "memberUserIds": [
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439018",
    "507f1f77bcf86cd799439020"
  ],
  "createdBy": "507f1f77bcf86cd799439012",
  "lastMessageAt": null,
  "isArchived": false,
  "createdAt": "2026-01-19T10:30:00.000Z",
  "updatedAt": "2026-01-19T16:20:00.000Z"
}
```

#### Error Responses
- **400 Bad Request**: userIds must be a non-empty array
- **404 Not Found**: Study group not found
- **500 Internal Server Error**: Server error

---

### 8. Archive Study Group

**POST** `/api/studygroups/:id/archive`

Archives a study group (soft delete). Archived groups won't appear in listing endpoints.

#### URL Parameters
- `id` - Study group ID

#### Success Response (200 OK)
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "classroomId": "507f1f77bcf86cd799439011",
  "name": "Math Study Group",
  "memberUserIds": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439018"],
  "createdBy": "507f1f77bcf86cd799439012",
  "lastMessageAt": null,
  "isArchived": true,
  "createdAt": "2026-01-19T10:30:00.000Z",
  "updatedAt": "2026-01-19T16:25:00.000Z"
}
```

#### Error Responses
- **404 Not Found**: Study group not found
- **500 Internal Server Error**: Server error

---

## Frontend Integration Examples

### Using Fetch API

#### Create a Study Group
```javascript
const createStudyGroup = async (classroomId, name, memberIds, token) => {
  try {
    const response = await fetch('/api/studygroups/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        classroomId,
        name,
        memberUserIds: memberIds
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create study group:', error);
    throw error;
  }
};
```

#### Get User's Study Groups
```javascript
const getUserStudyGroups = async (token) => {
  try {
    const response = await fetch('/api/studygroups/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch study groups');
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

#### Add Members to Study Group
```javascript
const addMembers = async (groupId, userIds, token) => {
  try {
    const response = await fetch(`/api/studygroups/${groupId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userIds })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to add members:', error);
    throw error;
  }
};
```

### Using Axios

```javascript
import axios from 'axios';

// Setup axios instance with auth
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create study group
const createStudyGroup = (classroomId, name, memberUserIds) => {
  return api.post('/studygroups/', { classroomId, name, memberUserIds });
};

// Get classroom study groups
const getClassroomStudyGroups = (classroomId) => {
  return api.get(`/studygroups/classroom/${classroomId}`);
};

// Archive study group
const archiveStudyGroup = (groupId) => {
  return api.post(`/studygroups/${groupId}/archive`);
};
```

---

## Common Error Responses

All endpoints may return the following error responses:

### 401 Unauthorized
```json
{
  "message": "Unauthorized - Invalid or missing token"
}
```

### 400 Bad Request
```json
{
  "message": "classroomId and non-empty memberUserIds are required"
}
```

### 404 Not Found
```json
{
  "message": "Study group not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Failed to create study group",
  "error": "Detailed error message"
}
```

---

## Notes for Frontend Developers

1. **Authentication**: Always include the JWT token in the Authorization header for all requests.

2. **Member Management**: 
   - Use `PUT /members` to completely replace the member list
   - Use `POST /members` to add members without removing existing ones
   - Use `DELETE /members` to remove specific members

3. **Filtering**: The listing endpoints automatically filter out archived groups (`isArchived: false`).

4. **Sorting**: Study groups are returned sorted by `updatedAt` in descending order (most recent first).

5. **Population**: The `GET /:id` endpoint returns populated member details (name, email, role), while other endpoints return just the user IDs.

6. **Validation**: The backend validates that:
   - All user IDs exist in the database
   - All members belong to the specified classroom
   - Required fields are present

7. **Error Handling**: Always check the response status and handle errors appropriately in your UI.

---

## Related APIs

- **Group Messages**: `/api/group-messages` - For sending and retrieving messages within study groups
- **Physical Classrooms**: `/api/physical-classrooms` - For classroom management
- **Users**: `/api/users` - For user information

---

**Last Updated**: January 19, 2026
