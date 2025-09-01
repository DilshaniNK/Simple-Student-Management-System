import { Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherDetails = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem('token'); // if you need auth
        const response = await axios.get('http://localhost:8070/admin/teachers/view', {
          headers: {
            "authorization": `Bearer ${token}`,
          },
        });

        // response.data should contain your array of teachers
        setTeachers(response.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="space-y-6 mt-[80px] ml-[-120px] mr-[20px]">
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
                <tr key={teacher._id || teacher.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                        {teacher.firstName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <span className="font-medium text-gray-800">{teacher.firstName}</span>
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
                  <td className="px-6 py-4 whitespace-nowrap flex gap-7 ">
                    <button className="text-green-600 hover:text-green-800 font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TeacherDetails;
