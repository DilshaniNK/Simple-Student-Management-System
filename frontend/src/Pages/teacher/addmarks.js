import React, { useState, useEffect } from "react";
import { BookOpen, Calendar, Hash, User, Save, CheckCircle, AlertCircle } from "lucide-react";

function AddMarks() {
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [teacherClass, setTeacherClass] = useState("Grade 5A");

  // Mock students data - replace with your API call
  const mockStudents = [
    { id: "S001", name: "Emma Thompson" },
    { id: "S002", name: "Liam Chen" },
    { id: "S003", name: "Sophia Rodriguez" },
    { id: "S004", name: "Noah Williams" },
    { id: "S005", name: "Ava Davis" },
    { id: "S006", name: "Oliver Johnson" },
    { id: "S007", name: "Isabella Martinez" },
    { id: "S008", name: "Mason Brown" }
  ];

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

  useEffect(() => {
    // Simulate fetching teacher's assigned students
    setStudents(mockStudents);
    // Initialize marks object
    const initialMarks = {};
    mockStudents.forEach(student => {
      initialMarks[student.id] = "";
    });
    setMarks(initialMarks);
  }, []);

  const handleMarkChange = (studentId, value) => {
    // Validate mark is between 0-100
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setMarks(prev => ({
        ...prev,
        [studentId]: value
      }));
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!year || !term || !selectedSubject) {
      setError("Please fill in Year, Term, and Subject");
      return;
    }

    const emptyMarks = Object.values(marks).some(mark => mark === "");
    if (emptyMarks) {
      setError("Please enter marks for all students");
      return;
    }

    const invalidMarks = Object.values(marks).some(mark => 
      isNaN(Number(mark)) || Number(mark) < 0 || Number(mark) > 100
    );
    if (invalidMarks) {
      setError("Please enter valid marks (0-100)");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      const marksData = students.map(student => ({
        studentId: student.id,
        marks: Number(marks[student.id]),
        subject: selectedSubject,
        year: year,
        term: term
      }));

      // Replace with your actual API call
      // await axios.post("http://localhost:8070/teacher/add-marks", {
      //   year,
      //   term,
      //   subject: selectedSubject,
      //   marks: marksData
      // });

      console.log("Submitting marks:", { year, term, subject: selectedSubject, marks: marksData });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess(`Marks for ${selectedSubject} - ${year} Term ${term} submitted successfully!`);
      
      // Clear marks for next subject
      const clearedMarks = {};
      students.forEach(student => {
        clearedMarks[student.id] = "";
      });
      setMarks(clearedMarks);
      setSelectedSubject("");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      setError("Failed to submit marks. Please try again.");
      console.error("Error submitting marks:", err);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50  mt-[50px]  ml-[-165px] w-[1500px] !p-0">
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
        {/* Year and Term Selection */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" />
            Academic Period
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2024"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Term
              </label>
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

        {/* Marks Entry Table */}
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
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center justify-center h-8 w-8 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm">
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.id}</div>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Messages */}
        {success && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
              <p className="text-green-800">{success}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-red-800">{error}</p>
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