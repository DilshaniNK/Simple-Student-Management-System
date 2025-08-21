import React, { useState, useEffect } from "react";
import { 
  Megaphone, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  Users, 
  AlertCircle,
  CheckCircle,
  X,
  Save,
  Send
} from "lucide-react";

function TeacherAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingId, setViewingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "medium",
    targetAudience: "class",
    expiryDate: "",
    isUrgent: false
  });

  const [teacherInfo] = useState({
    name: "Sarah Johnson",
    class: "Grade 5A",
    id: "T001"
  });

  // Mock data - replace with your API calls
  const mockAnnouncements = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      content: "Dear parents, we will be conducting parent-teacher meetings next Friday from 2:00 PM to 6:00 PM. Please schedule your slot through the school portal.",
      priority: "high",
      targetAudience: "parents",
      createdAt: "2024-01-15T10:30:00Z",
      expiryDate: "2024-01-25",
      isUrgent: false,
      views: 23,
      status: "active"
    },
    {
      id: 2,
      title: "Science Project Submission",
      content: "Reminder: Science project submissions are due this Wednesday. Please ensure all materials are properly labeled and include the project report.",
      priority: "medium",
      targetAudience: "class",
      createdAt: "2024-01-14T14:15:00Z",
      expiryDate: "2024-01-22",
      isUrgent: true,
      views: 18,
      status: "active"
    },
    {
      id: 3,
      title: "Field Trip Permission",
      content: "We're planning an educational field trip to the Science Museum next month. Permission slips will be sent home today. Please return them signed by Friday.",
      priority: "medium",
      targetAudience: "both",
      createdAt: "2024-01-13T09:00:00Z",
      expiryDate: "2024-01-30",
      isUrgent: false,
      views: 31,
      status: "active"
    },
    {
      id: 4,
      title: "Math Competition Results",
      content: "Congratulations to all students who participated in the inter-class math competition! Results are now available on the notice board.",
      priority: "low",
      targetAudience: "class",
      createdAt: "2024-01-12T16:45:00Z",
      expiryDate: "2024-01-20",
      isUrgent: false,
      views: 45,
      status: "expired"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setAnnouncements(mockAnnouncements);
      setLoading(false);
    }, 800);
  }, []);

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      const newAnnouncement = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        views: 0,
        status: "active"
      };

      setAnnouncements(prev => [newAnnouncement, ...prev]);
      setShowCreateForm(false);
      setFormData({
        title: "",
        content: "",
        priority: "medium",
        targetAudience: "class",
        expiryDate: "",
        isUrgent: false
      });
      setSuccess("Announcement created successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleEditAnnouncement = async (id) => {
    setLoading(true);
    try {
      // Simulate API call
      const updatedAnnouncements = announcements.map(ann => 
        ann.id === id ? { ...ann, ...formData } : ann
      );
      setAnnouncements(updatedAnnouncements);
      setEditingId(null);
      setFormData({
        title: "",
        content: "",
        priority: "medium",
        targetAudience: "class",
        expiryDate: "",
        isUrgent: false
      });
      setSuccess("Announcement updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    // if (!confirm("Are you sure you want to delete this announcement?")) return;
    
    setLoading(true);
    try {
      setAnnouncements(prev => prev.filter(ann => ann.id !== id));
      setSuccess("Announcement deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete announcement");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (announcement) => {
    setEditingId(announcement.id);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
      targetAudience: announcement.targetAudience,
      expiryDate: announcement.expiryDate,
      isUrgent: announcement.isUrgent
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      content: "",
      priority: "medium",
      targetAudience: "class",
      expiryDate: "",
      isUrgent: false
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAudienceIcon = (audience) => {
    switch (audience) {
      case "parents": return "👨‍👩‍👧‍👦";
      case "class": return "🎓";
      case "both": return "👥";
      default: return "📢";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const AnnouncementForm = ({ isEditing = false }) => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {isEditing ? "Edit Announcement" : "Create New Announcement"}
      </h3>
      
      <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter announcement title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Enter announcement content"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <select
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="class">Students Only</option>
                <option value="parents">Parents Only</option>
                <option value="both">Students & Parents</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isUrgent"
              checked={formData.isUrgent}
              onChange={(e) => setFormData(prev => ({ ...prev, isUrgent: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isUrgent" className="ml-2 text-sm text-gray-700">
              Mark as urgent
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={isEditing ? () => handleEditAnnouncement(editingId) : handleCreateAnnouncement}
              disabled={loading}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                  {isEditing ? "Update Announcement" : "Create Announcement"}
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={isEditing ? cancelEdit : () => setShowCreateForm(false)}
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50  mt-[50px]  ml-[-165px] w-[1500px] !p-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 mt-9">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Megaphone className="h-8 w-8 mr-3 text-blue-600" />
                Class Announcements
              </h1>
              <p className="text-gray-600 mt-1">Manage announcements for {teacherInfo.class}</p>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
              <p className="text-green-800">{success}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Create Form */}
        {showCreateForm && <AnnouncementForm />}

        {/* Edit Form */}
        {editingId && <AnnouncementForm isEditing={true} />}

        {/* Announcements List */}
        <div className="space-y-6">
          {loading && !announcements.length ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading announcements...</span>
            </div>
          ) : announcements.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Megaphone className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No announcements yet</h3>
              <p className="text-gray-600 mb-6">Create your first announcement to get started</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Announcement
              </button>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {announcement.title}
                        </h3>
                        {announcement.isUrgent && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            🚨 Urgent
                          </span>
                        )}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(announcement.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">{getAudienceIcon(announcement.targetAudience)}</span>
                          {announcement.targetAudience === 'both' ? 'Students & Parents' : 
                           announcement.targetAudience === 'parents' ? 'Parents' : 'Students'}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {announcement.views} views
                        </div>
                        {announcement.expiryDate && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewingId(viewingId === announcement.id ? null : announcement.id)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => startEdit(announcement)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 line-clamp-2">
                      {announcement.content}
                    </p>
                  </div>

                  {/* Expanded Content */}
                  {viewingId === announcement.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {announcement.content}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="mt-4 flex justify-between items-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      announcement.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {announcement.status === 'active' ? '✅ Active' : '⏰ Expired'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherAnnouncements;