import React, { useState, useEffect } from "react";
import { Search, Edit, Save, X, Users, BookOpen, Calendar, User, AlertTriangle } from "lucide-react";

function TeacherInterface() {
  const [teacherId, setTeacherId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherClass, setTeacherClass] = useState("");
  
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get teacher info from localStorage on component mount
  useEffect(() => {
  const storedTeacherName = localStorage.getItem("TeacherName");
  const storedTeacherId = localStorage.getItem("TeacherId"); // <-- fix the key
  const storedTeacherClass = localStorage.getItem("TeacherClass");
  
    
  if (storedTeacherName && storedTeacherId) {
    setTeacherName(storedTeacherName);
    setTeacherId(storedTeacherId);
    setTeacherClass(storedTeacherClass || "Not Assigned");
  } else {
    setError("Teacher information not found. Please login again.");
  }
}, []);


  // Fetch students when teacher info is available
  useEffect(() => {
    if (teacherId) {
      fetchStudents();
    }
  }, [teacherId]);

  // Filter students based on search term
  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

 const fetchStudents = async () => {
  setLoading(true);
  setError("");

  const teacherId = localStorage.getItem("TeacherId");

  // Fetch assigned class or fallback to "5"
  const assignedClass = teacherId
    ? await fetchAssignedClass(teacherId)
    : "Grade 10";

  try {
    const response = await fetch(`http://localhost:8070/student/students-by-class/${assignedClass}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Directly use the student list from the backend
    setStudents(data.students);
    setFilteredStudents(data.students);

  } catch (err) {
    console.error("Error fetching students:", err);
    setError("Failed to load students. Please check your connection and try again.");
  } finally {
    setLoading(false);
  }
};







const fetchAssignedClass = async (teacherId) => {
  try {
    const response = await fetch(`http://localhost:8070/teacher/assigned-class/${teacherId}`);
    const data = await response.json();
    return data.assignedClass || "Grade 10"; // fallback again if not assigned
  } catch (err) {
    console.error("Error fetching assigned class:", err);
    return "5";
  }
};




  const handleEditClick = (student) => {
    setEditingStudentId(student.studentId);
    setEditData({
      name: student.name,
      age: student.age,
      gender: student.gender,
      class: student.class || student.className
    });
  };

  const handleEditCancel = () => {
    setEditingStudentId(null);
    setEditData({});
  };

  const handleEditSubmit = async (studentId) => {
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const updatedStudent = {
        name: editData.name,
        age: Number(editData.age),
        gender: editData.gender,
        class: editData.class,
      };

      const response = await fetch(
        `http://localhost:8070/teacher/student/update/${studentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedStudent),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Update local state
      const updatedStudents = students.map(student =>
        student.studentId === studentId ? { ...student, ...editData } : student
      );
      setStudents(updatedStudents);
      setEditingStudentId(null);
      setEditData({});
      
      setSuccess("Student updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
      
    } catch (err) {
      console.error("Error updating student:", err);
      setError("Failed to update student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateAttendance = (student) => {
    // This is a placeholder - implement based on your attendance data structure
    // You might need to fetch attendance data separately
    return student.attendance || "N/A";
  };

  const getLastSeen = (student) => {
    // This is a placeholder - implement based on your attendance/login data
    // You might need to fetch this data separately
    if (student.lastLogin) {
      const lastLogin = new Date(student.lastLogin);
      const today = new Date();
      const diffTime = today - lastLogin;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      return `${diffDays} days ago`;
    }
    return "Unknown";
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
    </div>
  );

  const RefreshButton = () => (
    <button
      onClick={fetchStudents}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Loading...
        </>
      ) : (
        "Refresh Data"
      )}
    </button>
  );

  return (
<div className=" min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50  mt-[50px]  ml-[-165px] w-[1500px] !p-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {teacherName || "Teacher"}
              </h1>
              <p className="text-gray-600 mt-1">Managing {teacherClass}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Teacher ID: {teacherId}</p>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-red-800">{error}</p>
              <RefreshButton />
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex items-center">
              <div className="h-5 w-5 text-green-400 mr-3">✓</div>
              <p className="text-green-800">{success}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Students"
            value={students.length}
            color="border-blue-500"
          />
          <StatCard
            icon={BookOpen}
            title="Class"
            value={teacherClass}
            color="border-green-500"
          />
          {/* <StatCard
            icon={Calendar}
            title="Present Today"
            value={students.filter(s => getLastSeen(s) === "Today").length}
            color="border-purple-500"
          />
          <StatCard
            icon={User}
            title="Average Age"
            value={students.length > 0 ? Math.round(students.reduce((sum, s) => sum + (s.age || 0), 0) / students.length) : 0}
            color="border-orange-500"
          /> */}
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search students by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Showing {filteredStudents.length} of {students.length} students
              </div>
              <RefreshButton />
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-xl font-semibold text-white">Class Students</h2>
          </div>

          {loading && students.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading students...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Student ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Age</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Gender</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Class</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">
                          {students.length === 0 ? "No students found" : "No students match your search"}
                        </p>
                        <p className="text-sm">
                          {students.length === 0 ? "Check your connection and try refreshing" : "Try adjusting your search criteria"}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student, index) => (
                      <tr key={student.studentId || student._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-blue-600 font-medium">
                            {student.studentId}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {editingStudentId === student.studentId ? (
                            <input
                              type="text"
                              value={editData.name}
                              onChange={(e) => setEditData({...editData, name: e.target.value})}
                              className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          ) : (
                            <div className="flex items-center">
                              <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                                {student.name ? student.name.charAt(0).toUpperCase() : '?'}
                              </div>
                              <span className="font-medium text-gray-900">{student.name}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingStudentId === student.studentId ? (
                            <input
                              type="number"
                              value={editData.age}
                              onChange={(e) => setEditData({...editData, age: parseInt(e.target.value) || ''})}
                              className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          ) : (
                            <span className="text-gray-900">{student.age || 'N/A'}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingStudentId === student.studentId ? (
                            <select
                              value={editData.gender}
                              onChange={(e) => setEditData({...editData, gender: e.target.value})}
                              className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          ) : (
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              student.gender === 'Female' 
                                ? 'bg-pink-100 text-pink-800' 
                                : student.gender === 'Male'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {student.gender || 'N/A'}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingStudentId === student.studentId ? (
                            <input
                              type="text"
                              value={editData.class}
                              onChange={(e) => setEditData({...editData, class: e.target.value})}
                              className="w-24 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          ) : (
                            <span className="text-gray-900">{student.class || student.className || 'N/A'}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingStudentId === student.studentId ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditSubmit(student.studentId)}
                                className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                                disabled={loading}
                              >
                                <Save className="h-4 w-4 mr-1" />
                                Save
                              </button>
                              <button
                                onClick={handleEditCancel}
                                className="inline-flex items-center px-3 py-1 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEditClick(student)}
                              className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherInterface;