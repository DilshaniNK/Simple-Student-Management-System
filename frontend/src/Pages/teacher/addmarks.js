import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookOpen, Calendar, Hash, User, Save, CheckCircle, AlertCircle } from "lucide-react";

function AddMarks() {
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(""); // For fetch errors
  const [submitError, setSubmitError] = useState(""); // For submission errors
  const [teacherClass, setTeacherClass] = useState("Grade 5A");

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Social Studies",
    "Art",
    "Physical Education",
    "Music",
    "Computer Science"
  ];

  const terms = [
    { value: "1", label: "Term 1" },
    { value: "2", label: "Term 2" },
    { value: "3", label: "Term 3" }
  ];

  // Fetch students on load or when teacherClass changes
  useEffect(() => {
    const storedTeacherClass = localStorage.getItem("TeacherClass");
    if (storedTeacherClass) setTeacherClass(storedTeacherClass);

    const fetchStudents = async () => {
      setFetchingStudents(true);
      setError("");
      try {
        const response = await fetch(`http://localhost:8070/student/students-by-grade/${storedTeacherClass || teacherClass}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setStudents(data.students);

        const initialMarks = {};
        data.students.forEach(student => {
          initialMarks[student.id] = "";
        });
        setMarks(initialMarks);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students. Please check your connection and try again.");
      } finally {
        setFetchingStudents(false);
      }
    };

    fetchStudents();
  }, [teacherClass]);

  const handleMarkChange = (studentId, value) => {
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setMarks(prev => ({
        ...prev,
        [studentId]: value
      }));
    }
  };

  const handleSubmit = async () => {
    if (!year || !term || !selectedSubject) {
      setSubmitError("Please fill in Year, Term, and Subject");
      return;
    }

    const emptyMarks = Object.values(marks).some(mark => mark === "");
    if (emptyMarks) {
      setSubmitError("Please enter marks for all students");
      return;
    }

    const invalidMarks = Object.values(marks).some(mark =>
      isNaN(Number(mark)) || Number(mark) < 0 || Number(mark) > 100
    );
    if (invalidMarks) {
      setSubmitError("Please enter valid marks (0-100)");
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      const marksData = students.map(student => ({
        studentId: student.studentId,
        marks: Number(marks[student.id]),
        subject: selectedSubject,
        year,
        term
      }));

      const response = await axios.post(
        "http://localhost:8070/marks/add-marks",
        { marksData, year, term, subject: selectedSubject }
      );

      if (response.status === 201) {
        setSuccess(`Marks for ${selectedSubject} - ${year} Term ${term} submitted successfully!`);

        // Clear marks
        const clearedMarks = {};
        students.forEach(student => { clearedMarks[student.id] = ""; });
        setMarks(clearedMarks);
        setSelectedSubject("");

        setTimeout(() => setSuccess(""), 3000);
      } else {
        setSubmitError("Failed to submit marks. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting marks:", err);
      setSubmitError("Failed to submit marks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getMarkColor = (mark) => {
    if (mark === "") return "";
    const numMark = Number(mark);
    if (numMark >= 85) return "text-green-600 bg-green-50";
    if (numMark >= 70) return "text-blue-600 bg-blue-50";
    if (numMark >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 mt-[50px] ml-[-165px] w-[1500px] !p-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center mt-9">
                <BookOpen className="h-8 w-8 mr-3 text-blue-600" />
                Add Student Marks
              </h1>
              <p className="text-gray-600 mt-1">Managing marks for {teacherClass}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Year and Term */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" />
            Academic Period
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2024"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
              <select
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="">Select Term</option>
                {terms.map(termOption => (
                  <option key={termOption.value} value={termOption.value}>
                    {termOption.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Marks Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-xl font-semibold text-white">Student Marks Entry</h2>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      <div className="flex items-center">
                        <Hash className="h-4 w-4 mr-2 text-gray-600" />
                        Index
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-600" />
                        Student Name
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      <div className="flex flex-col items-start">
                        <div className="flex items-center mb-2">
                          <BookOpen className="h-4 w-4 mr-2 text-gray-600" />
                          Subject & Marks
                        </div>
                        <select
                          value={selectedSubject}
                          onChange={(e) => setSelectedSubject(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm min-w-[200px]"
                        >
                          <option value="">Select Subject</option>
                          {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {fetchingStudents ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-2 text-gray-500">Loading students...</p>
                      </td>
                    </tr>
                  ) : students.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={student.studentId} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center justify-center h-8 w-8 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm">
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                              {student.firstName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{student.firstName}</div>
                              <div className="text-sm text-gray-500">{student.studentId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {selectedSubject ? (
                            <div className="flex items-center space-x-3">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={marks[student.id]}
                                onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                placeholder="Enter marks (0-100)"
                                className={`w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${getMarkColor(marks[student.id])}`}
                              />
                              {marks[student.id] && (
                                <div className="flex items-center">
                                  {Number(marks[student.id]) >= 60 ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">Select a subject first</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-gray-500 italic">
                        No students found for this class.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Fetch Error */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Submission Messages */}
        {submitError && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-red-800">{submitError}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
              <p className="text-green-800">{success}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading || !selectedSubject || !year || !term}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Submitting Marks...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-3" />
                Submit Marks for {selectedSubject || "Subject"}
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Instructions:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Fill in the Academic Year and Term first</li>
            <li>• Select a subject from the dropdown in the table header</li>
            <li>• Enter marks for each student (0-100)</li>
            <li>• Click Submit to save marks for the selected subject</li>
            <li>• You can then select another subject and repeat the process</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddMarks;
