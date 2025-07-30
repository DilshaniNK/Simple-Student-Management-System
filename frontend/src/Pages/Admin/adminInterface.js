import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  Users, 
  UserPlus, 
  GraduationCap, 
  Home, 
  Settings, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  Search,
  Plus,
  Eye
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

// Mock school images - replace with your actual images
const schoolImages = [
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
];

function AdminInterface() {
  const [selectedSection, setSelectedSection] = useState("Dashboard");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % schoolImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockStudents = [
        { id: 1, name: "John Doe", grade: "Grade 10", gender: "Male", age: 16, email: "john@school.com" },
        { id: 2, name: "Jane Smith", grade: "Grade 9", gender: "Female", age: 15, email: "jane@school.com" },
        { id: 3, name: "Mike Johnson", grade: "Grade 11", gender: "Male", age: 17, email: "mike@school.com" },
        { id: 4, name: "Sarah Wilson", grade: "Grade 10", gender: "Female", age: 16, email: "sarah@school.com" },
        { id: 5, name: "David Brown", grade: "Grade 12", gender: "Male", age: 18, email: "david@school.com" },
        { id: 6, name: "Emily Davis", grade: "Grade 9", gender: "Female", age: 15, email: "emily@school.com" },
        { id: 7, name: "Alex Chen", grade: "Grade 11", gender: "Male", age: 17, email: "alex@school.com" },
        { id: 8, name: "Lisa Garcia", grade: "Grade 10", gender: "Female", age: 16, email: "lisa@school.com" },
        { id: 9, name: "Tom Wilson", grade: "Grade 12", gender: "Male", age: 18, email: "tom@school.com" },
        { id: 10, name: "Amy Johnson", grade: "Grade 9", gender: "Female", age: 15, email: "amy@school.com" },
      ];

      const mockTeachers = [
        { id: 1, name: "Dr. Robert Smith", subject: "Mathematics", gender: "Male", experience: 10, email: "robert@school.com" },
        { id: 2, name: "Ms. Jennifer Lee", subject: "English", gender: "Female", experience: 8, email: "jennifer@school.com" },
        { id: 3, name: "Mr. Michael Brown", subject: "Science", gender: "Male", experience: 12, email: "michael@school.com" },
        { id: 4, name: "Mrs. Sarah Johnson", subject: "History", gender: "Female", experience: 15, email: "sarah.j@school.com" },
        { id: 5, name: "Dr. David Wilson", subject: "Physics", gender: "Male", experience: 20, email: "david.w@school.com" },
      ];

      setStudents(mockStudents);
      setTeachers(mockTeachers);
      setTotalStudents(mockStudents.length);
      setTotalTeachers(mockTeachers.length);

      // Calculate gender distribution
      const maleStudents = mockStudents.filter(s => s.gender === "Male").length;
      const femaleStudents = mockStudents.filter(s => s.gender === "Female").length;
      
      setGenderData([
        { name: "Male", value: maleStudents, color: "#3b82f6" },
        { name: "Female", value: femaleStudents, color: "#ec4899" },
      ]);

      // Calculate grade distribution
      const gradeCount = mockStudents.reduce((acc, student) => {
        acc[student.grade] = (acc[student.grade] || 0) + 1;
        return acc;
      }, {});

      setGradeData(
        Object.entries(gradeCount).map(([grade, count]) => ({
          grade,
          count,
        }))
      );

      // Mock recent activities
      setRecentActivities([
        { action: "New student registered", time: "2 hours ago", type: "student", user: "John Doe" },
        { action: "Teacher profile updated", time: "5 hours ago", type: "teacher", user: "Ms. Jennifer Lee" },
        { action: "Grade report generated", time: "1 day ago", type: "report", user: "System" },
        { action: "New teacher assigned", time: "2 days ago", type: "teacher", user: "Dr. David Wilson" },
        { action: "Student attendance updated", time: "3 days ago", type: "student", user: "Sarah Wilson" },
      ]);

    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % schoolImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + schoolImages.length) % schoolImages.length);
  };

  

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = students.slice(startIndex, endIndex);

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-indigo-100  mt-[50px]  ml-[-165px] w-[1500px] !p-0">
    
      

      <div className="flex ">
    {/* Main Content */}
        <main className="flex-1 p-6">
          {selectedSection === "Dashboard" && (
            <div className="space-y-6">
              {/* School Images Carousel */}
              <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
                <div className="relative h-80">
                  <img
                    src={schoolImages[currentImageIndex]}
                    alt="School"
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 flex items-center justify-between px-6">
                    <button
                      onClick={prevImage}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <div className="text-center text-white">
                      <h2 className="text-4xl font-bold mb-2">Welcome to Our School</h2>
                      <p className="text-xl">Excellence in Education Since 1985</p>
                    </div>
                    <button
                      onClick={nextImage}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {schoolImages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Students</p>
                      <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Teachers</p>
                      <p className="text-3xl font-bold text-green-600">{totalTeachers}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Grade Levels</p>
                      <p className="text-3xl font-bold text-purple-600">4</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Attendance Rate</p>
                      <p className="text-3xl font-bold text-orange-600">95%</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gender Distribution Pie Chart */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Student Gender Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Male: {genderData[0]?.value || 0}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                      <span className="text-sm font-medium">Female: {genderData[1]?.value || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Grade Distribution Bar Chart */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Students by Grade Level</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={gradeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="grade" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedSection("Students")}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Register Student</span>
                </button>
                <button
                  onClick={() => navigate('/admin/add_teacher')}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Register Teacher</span>
                </button>
                <button
                  onClick={() => setSelectedSection("Analytics")}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>View Reports</span>
                </button>
               
              </div>

              {/* Recent Activities */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          activity.type === "student" ? "bg-blue-500" : 
                          activity.type === "teacher" ? "bg-green-500" : "bg-orange-500"
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-800">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.user}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedSection === "Students" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Student Management</h2>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Student</span>
                </button>
              </div>

              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50/50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Age</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-medium text-gray-800">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{student.grade}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              student.gender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                            }`}>
                              {student.gender}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{student.age}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{student.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(endIndex, students.length)} of {students.length} students
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* {selectedSection === "Teachers" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Teacher Management</h2>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Teacher</span>
                </button>
              </div>

              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50/50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {teachers.map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                                {teacher.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </div>
                              <span className="font-medium text-gray-800">{teacher.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{teacher.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              teacher.gender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                            }`}>
                              {teacher.gender}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{teacher.experience} years</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{teacher.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-green-600 hover:text-green-800 font-medium">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )} */}

          {selectedSection === "Analytics" && (
            <div className="text-center py-20">
              <BarChart3 className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h2>
              <p className="text-gray-600">Advanced analytics and reporting features coming soon...</p>
            </div>
          )}

          {selectedSection === "Settings" && (
            <div className="text-center py-20">
              <Settings className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Settings Panel</h2>
              <p className="text-gray-600">System configuration and preferences coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminInterface;