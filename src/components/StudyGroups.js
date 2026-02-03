import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { 
  getUserStudyGroups, 
  createStudyGroup, 
  getStudyGroupById,
  archiveStudyGroup,
  addStudyGroupMembers,
  removeStudyGroupMembers
} from '../services/studyGroupService';
import { getUserClassrooms, getClassroomUsers } from '../services/classroomService';
import { 
  getMessagesByStudyGroup, 
  postGroupMessage, 
  deleteMessage 
} from '../services/groupMessagesService';
import './StudyGroups.css';

const StudyGroups = () => {
  const [studyGroups, setStudyGroups] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [creating, setCreating] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Get current user ID
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.id);
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
  }, []);

  // Load study groups and classrooms
  useEffect(() => {
    if (currentUserId) {
      loadData();
    }
  }, [currentUserId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [groupsData, classroomsData] = await Promise.all([
        getUserStudyGroups(),
        getUserClassrooms()
      ]);

      setStudyGroups(Array.isArray(groupsData) ? groupsData : []);
      setClassrooms(Array.isArray(classroomsData?.enrolled) ? classroomsData.enrolled : []);
    } catch (err) {
      console.error('Error loading study groups:', err);
      setError('Failed to load study groups. Please try again.');
      setStudyGroups([]);
    } finally {
      setLoading(false);
    }
  };

  // Load available users when classroom is selected
  useEffect(() => {
    const loadClassroomUsers = async () => {
      if (!selectedClassroom) {
        setAvailableUsers([]);
        return;
      }

      try {
        const users = await getClassroomUsers(selectedClassroom);
        setAvailableUsers(Array.isArray(users) ? users : []);
      } catch (err) {
        console.error('Error loading classroom users:', err);
        setAvailableUsers([]);
      }
    };

    loadClassroomUsers();
  }, [selectedClassroom]);

  // Load detailed group info when viewing details
  const loadGroupDetails = async (groupId) => {
    try {
      const group = await getStudyGroupById(groupId);
      setSelectedGroup(group);
      setShowDetailsModal(true);
      await loadMessages(groupId);
    } catch (err) {
      console.error('Error loading group details:', err);
      alert('Failed to load group details');
    }
  };

  // Load messages for a study group
  const loadMessages = async (groupId) => {
    try {
      setLoadingMessages(true);
      const messagesData = await getMessagesByStudyGroup(groupId);
      const list = Array.isArray(messagesData) ? messagesData : [];
      setMessages(list);
      // Scroll to bottom after messages load
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    } catch (err) {
      console.error('Error loading messages:', err);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedGroup || sendingMessage) return;

    try {
      setSendingMessage(true);
      await postGroupMessage(selectedGroup._id, {
        content: newMessage.trim()
      });
      setNewMessage('');
      // Reload messages and group data
      await loadMessages(selectedGroup._id);
      await loadData(); // Refresh study groups list to update lastMessageAt
    } catch (err) {
      console.error('Error sending message:', err);
      alert(err.response?.data?.message || 'Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  // Delete a message
  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      await deleteMessage(messageId);
      await loadMessages(selectedGroup._id);
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('Failed to delete message');
    }
  };

  // Auto-refresh messages when modal is open
  useEffect(() => {
    if (!showDetailsModal || !selectedGroup) return;

    const interval = setInterval(() => {
      loadMessages(selectedGroup._id);
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [showDetailsModal, selectedGroup]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCreateGroup = async () => {
    if (!selectedClassroom || selectedMembers.length === 0) {
      alert('Please select a classroom and at least one member');
      return;
    }

    try {
      setCreating(true);
      const payload = {
        classroomId: selectedClassroom,
        name: groupName || undefined,
        memberUserIds: selectedMembers
      };

      await createStudyGroup(payload);
      await loadData();
      
      // Reset form
      setShowCreateModal(false);
      setSelectedClassroom('');
      setGroupName('');
      setSelectedMembers([]);
    } catch (err) {
      console.error('Error creating study group:', err);
      alert(err.response?.data?.message || 'Failed to create study group');
    } finally {
      setCreating(false);
    }
  };

  const handleArchiveGroup = async (groupId) => {
    if (!window.confirm('Are you sure you want to archive this study group?')) {
      return;
    }

    try {
      await archiveStudyGroup(groupId);
      await loadData();
      if (showDetailsModal) {
        setShowDetailsModal(false);
        setSelectedGroup(null);
      }
    } catch (err) {
      console.error('Error archiving study group:', err);
      alert('Failed to archive study group');
    }
  };

  const handleAddMembers = async (groupId, userIds) => {
    try {
      await addStudyGroupMembers(groupId, { userIds });
      await loadGroupDetails(groupId);
      await loadData();
    } catch (err) {
      console.error('Error adding members:', err);
      alert('Failed to add members');
    }
  };

  const handleRemoveMembers = async (groupId, userIds) => {
    try {
      await removeStudyGroupMembers(groupId, { userIds });
      await loadGroupDetails(groupId);
      await loadData();
    } catch (err) {
      console.error('Error removing members:', err);
      alert('Failed to remove members');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleMemberSelection = (userId) => {
    setSelectedMembers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  if (loading) {
    return (
      <div className="study-groups-section">
        <div className="study-groups-loading">
          <p>Loading study groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="study-groups-section">
      <div className="study-groups-header">
        <h3 className="header-study-groups">My Study Groups</h3>
        <button 
          className="create-group-btn"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Study Group
        </button>
      </div>

      {error && (
        <div className="study-groups-error">
          <p>{error}</p>
          <button onClick={loadData}>Retry</button>
        </div>
      )}

      {studyGroups.length === 0 ? (
        <div className="study-groups-empty">
          <div className="empty-icon">👥</div>
          <h3>No study groups yet</h3>
          <p>Create a study group to collaborate with classmates!</p>
        </div>
      ) : (
        <div className="study-groups-grid">
          {studyGroups.map((group) => (
            <div key={group._id} className="study-group-card">
              <div className="study-group-header">
                <h4 className="study-group-name">
                  {group.name || `Study Group ${group._id.slice(-6)}`}
                </h4>
                <button
                  className="archive-btn"
                  onClick={() => handleArchiveGroup(group._id)}
                  title="Archive group"
                >
                  🗄️
                </button>
              </div>
              
              <div className="study-group-info">
                <p className="study-group-members">
                  👥 {Array.isArray(group.memberUserIds) ? group.memberUserIds.length : 0} members
                </p>
                {group.lastMessageAt && (
                  <p className="study-group-last-message">
                    💬 Last message: {formatDate(group.lastMessageAt)}
                  </p>
                )}
                <p className="study-group-updated">
                  Updated: {formatDate(group.updatedAt)}
                </p>
              </div>

              <button
                className="view-details-btn"
                onClick={() => loadGroupDetails(group._id)}
              >
                Open Group
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Study Group Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Study Group</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Classroom *</label>
                <select
                  value={selectedClassroom}
                  onChange={(e) => {
                    setSelectedClassroom(e.target.value);
                    setSelectedMembers([]);
                  }}
                  className="form-select"
                >
                  <option value="">Select a classroom...</option>
                  {classrooms.map((classroom) => (
                    <option key={classroom._id} value={classroom._id}>
                      {classroom.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Group Name (Optional)</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g., Math Study Group"
                  maxLength={120}
                  className="form-input"
                />
              </div>

              {selectedClassroom && (
                <div className="form-group">
                  <label>Select Members *</label>
                  <div className="members-selection">
                    {availableUsers.length === 0 ? (
                      <p className="no-users-message">Loading users...</p>
                    ) : (
                      availableUsers
                        .filter(user => user._id !== currentUserId)
                        .map((user) => (
                          <label key={user._id} className="member-checkbox">
                            <input
                              type="checkbox"
                              checked={selectedMembers.includes(user._id)}
                              onChange={() => toggleMemberSelection(user._id)}
                            />
                            <span>{user.name || user.email}</span>
                          </label>
                        ))
                    )}
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedClassroom('');
                    setGroupName('');
                    setSelectedMembers([]);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="create-btn"
                  onClick={handleCreateGroup}
                  disabled={creating || !selectedClassroom || selectedMembers.length === 0}
                >
                  {creating ? 'Creating...' : 'Create Group'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Study Group Details Modal */}
      {showDetailsModal && selectedGroup && (
        <div className="modal-overlay" onClick={() => {
          setShowDetailsModal(false);
          setSelectedGroup(null);
        }}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedGroup.name || `Study Group ${selectedGroup._id.slice(-6)}`}</h2>
              <button 
                className="modal-close-btn"
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedGroup(null);
                }}
              >
                ×
              </button>
            </div>

            <div className="modal-body modal-body-chat">
              {/* Members sidebar */}
              <div className="chat-sidebar">
                <div className="group-details-section">
                  <h3>Members ({Array.isArray(selectedGroup.memberUserIds) ? selectedGroup.memberUserIds.length : 0})</h3>
                  <div className="members-list">
                    {Array.isArray(selectedGroup.memberUserIds) && selectedGroup.memberUserIds.length > 0 ? (
                      selectedGroup.memberUserIds.map((member) => {
                        const memberData = typeof member === 'object' ? member : { _id: member, name: 'Unknown User' };
                        return (
                          <div key={memberData._id} className="member-item">
                            <span className="member-name">{memberData.name || memberData.email || 'Unknown'}</span>
                            {memberData.email && (
                              <span className="member-email">{memberData.email}</span>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p>No members</p>
                    )}
                  </div>
                </div>

                <div className="group-details-section">
                  <h3>Group Info</h3>
                  <div className="info-row">
                    <span className="info-label">Created:</span>
                    <span>{formatDate(selectedGroup.createdAt)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Last Updated:</span>
                    <span>{formatDate(selectedGroup.updatedAt)}</span>
                  </div>
                </div>

                <button
                  className="archive-btn-sidebar"
                  onClick={() => handleArchiveGroup(selectedGroup._id)}
                >
                  Archive Group
                </button>
              </div>

              {/* Messages area */}
              <div className="chat-main">
                <div className="messages-container" ref={messagesContainerRef}>
                  {loadingMessages ? (
                    <div className="messages-loading">
                      <p>Loading messages...</p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="messages-empty">
                      <div className="empty-icon">💬</div>
                      <h3>No messages yet</h3>
                      <p>Start the conversation by sending a message!</p>
                    </div>
                  ) : (
                    <div className="messages-list">
                      {(() => {
                        const members = selectedGroup.memberUserIds ?? [];
                        const memberMap = members.reduce((acc, m) => {
                          const id = typeof m === 'object' ? m._id : m;
                          const name = typeof m === 'object' ? (m.name || m.email) : null;
                          if (id) acc[id] = name || 'Member';
                          return acc;
                        }, {});
                        return messages.map((message) => {
                          const senderId = message.senderUserId ?? message.senderId ?? message.sender;
                          const senderIdStr = typeof senderId === 'object' ? senderId?._id : senderId;
                          const isOwnMessage = senderIdStr === currentUserId;
                          const senderName = memberMap[senderIdStr] ?? (typeof senderId === 'object' ? (senderId?.name || senderId?.email || 'Member') : 'Member');

                          return (
                          <div 
                            key={message._id} 
                            className={`message-item ${isOwnMessage ? 'message-own' : ''}`}
                          >
                            <div className="message-header">
                              <span className="message-sender">{senderName}</span>
                              <span className="message-time">{formatDate(message.createdAt)}</span>
                              {isOwnMessage && (
                                <button
                                  className="message-delete-btn"
                                  onClick={() => handleDeleteMessage(message._id)}
                                  title="Delete message"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                            <div className="message-content">{message.content}</div>
                          </div>
                          );
                        });
                      })()}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Message input */}
                <div className="message-input-container">
                  <textarea
                    className="message-input"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    rows={2}
                    disabled={sendingMessage}
                  />
                  <button
                    className="send-message-btn"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || sendingMessage}
                  >
                    {sendingMessage ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyGroups;
