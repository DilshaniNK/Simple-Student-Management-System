import React, { useState, useEffect } from "react";
import {
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";

function TeacherAnnouncements() {
  // Get teacher info from localStorage
  const teacherId = localStorage.getItem("TeacherId");
  const teacherName = localStorage.getItem("TeacherName");
  const teacherClass = localStorage.getItem("TeacherClass");

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
    isUrgent: false,
  });
  // console.log(teacherId, teacherName, teacherClass);
  // Fetch announcements
  useEffect(() => {
    if (!teacherId) return;
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8070/announcement/`);
        if (!res.ok) throw new Error("Failed to fetch announcements");
        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [teacherId]);

  // Create announcement
  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();

    // Ensure required fields are filled
    if (!formData.title || !formData.content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      // Prepare payload for backend
      const newAnnouncement = {
        title: formData.title,
        description: formData.content,
        date: new Date().toISOString(), // Using current date; change if you add a date input
 teacherId: teacherId,      };
      console.log(teacherId);
      const response = await fetch("http://localhost:8070/announcement/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnnouncement),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to create announcement");

      // Add new announcement to state
      setAnnouncements((prev) => [data.newAnnouncement, ...prev]);

      // Reset form
      setFormData({ title: "", content: "", teacherId: "" }); // reset teacherId too
      setSuccess("Announcement created successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  // Edit announcement
  const handleEditAnnouncement = async (id) => {
    setLoading(true);
    try {
      const updatedAnnouncement = { ...formData, id };
      const response = await fetch(
        `http://localhost:8070/teacher/announcements/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAnnouncement),
        }
      );
      if (!response.ok) throw new Error("Failed to update announcement");
      const updated = await response.json();

      setAnnouncements((prev) =>
        prev.map((ann) => (ann.id === id ? updated : ann))
      );
      setEditingId(null);
      resetForm();
      setSuccess("Announcement updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8070/announcement/delete/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete announcement");

      setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
      setSuccess("Announcement deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete announcement");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (announcement) => {
    setEditingId(announcement.id);
    setFormData({ ...announcement });
    setShowCreateForm(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowCreateForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      priority: "medium",
      targetAudience: "class",
      expiryDate: "",
      isUrgent: false,
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAudienceIcon = (audience) => {
    switch (audience) {
      case "parents":
        return "👨‍👩‍👧‍👦";
      case "class":
        return "🎓";
      case "both":
        return "👥";
      default:
        return "📢";
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const AnnouncementForm = ({
    formData,
    setFormData,
    loading,
    onSubmit,
    onCancel,
    isEditing,
  }) => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {isEditing ? "Edit Announcement" : "Create New Announcement"}
      </h3>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter announcement title"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Enter announcement content"
            rows="4"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isEditing ? "Update Announcement" : "Create Announcement"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 mt-[50px] ml-[-165px] w-[1500px] !p-0">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 mt-9">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Megaphone className="h-8 w-8 mr-3 text-blue-600" />
                Class Announcements
              </h1>
              <p className="text-gray-600 mt-1">
                Manage announcements for {teacherClass || "your class"}
              </p>
            </div>
            <button
              onClick={() => {
                if (showCreateForm) {
                  setShowCreateForm(false);
                } else {
                  resetForm();
                  setShowCreateForm(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={`inline-flex items-center px-5 py-2.5 font-medium rounded-lg shadow transition-colors ${
                showCreateForm
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {showCreateForm ? (
                <>
                  <X className="h-5 w-5 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Add Announcement
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create/Edit Form */}
        {(showCreateForm || editingId) && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingId
                      ? "Edit Announcement"
                      : "Create New Announcement"}
                  </h2>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <AnnouncementForm
                  formData={formData}
                  setFormData={setFormData}
                  loading={loading}
                  onSubmit={
                    editingId
                      ? () => handleEditAnnouncement(editingId)
                      : handleCreateAnnouncement
                  }
                  onCancel={cancelEdit}
                  isEditing={!!editingId}
                />
              </div>
            </div>
          </div>
        )}
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

        <div className="space-y-6">
          {loading && !announcements.length ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">
                Loading announcements...
              </span>
            </div>
          ) : announcements.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Megaphone className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No announcements yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first announcement to get started
              </p>
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
              <div
                key={announcement.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
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
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                            announcement.priority
                          )}`}
                        >
                          {/* {announcement.priority.toUpperCase()} */}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(announcement.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">
                            {getAudienceIcon(announcement.targetAudience)}
                          </span>
                          {announcement.targetAudience === "both"
                            ? "Students & Parents"
                            : announcement.targetAudience === "parents"
                            ? "Parents"
                            : "Students"}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {announcement.views} views
                        </div>
                        {announcement.expiryDate && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Expires:{" "}
                            {new Date(
                              announcement.expiryDate
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setViewingId(
                            viewingId === announcement.id
                              ? null
                              : announcement.id
                          )
                        }
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
                        onClick={() =>
                          handleDeleteAnnouncement(announcement._id)
                        }
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 line-clamp-2">
                      {announcement.description}
                    </p>
                  </div>
                  {viewingId === announcement.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {announcement.description}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        announcement.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {announcement.status === "active"
                        ? "✅ Active"
                        : "⏰ Expired"}
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
