import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, BookOpen, Calendar, Upload, Save, X, Users, Briefcase, Heart, Shield } from 'lucide-react';
import axios from 'axios';
import Swal from "sweetalert2";

const Studentreg = () => {
  const [formData, setFormData] = useState({
    // Student Details
    firstName: '',
    lastName: '',
    address: '',
    contactNumber: '',
    email: '',
    
    grade: '',
    age: '',
    gender: '',
    dateOfBirth: '',
   
    bloodGroup: '',
    medicalConditions: '',
    emergencyContact: '',
    qualifications: null,
    
    // Mother Details
    motherFirstName: '',
    motherLastName: '',
    motherAge: '',
    motherJob: '',
    motherContactNumber: '',
    motherEmail: '',
    motherAddress: '',
    
    // Father Details
    fatherFirstName: '',
    fatherLastName: '',
    fatherAge: '',
    fatherJob: '',
    fatherContactNumber: '',
    fatherEmail: '',
    fatherAddress: ''
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [activeParentTab, setActiveParentTab] = useState('mother');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const grades = Array.from({ length: 13 }, (_, i) => `Grade ${i + 1}`);
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        qualifications: file
      }));
      setErrors(prev => ({
        ...prev,
        qualifications: ''
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        qualifications: 'Please upload a PDF file'
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Student validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.grade.trim()) newErrors.grade = 'Grade is required';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    
    // Parent validation (at least one parent required)
    const hasMotherInfo = formData.motherFirstName || formData.motherLastName || formData.motherContactNumber;
    const hasFatherInfo = formData.fatherFirstName || formData.fatherLastName || formData.fatherContactNumber;
    
    if (!hasMotherInfo && !hasFatherInfo) {
      newErrors.parentInfo = 'At least one parent information is required';
    }
    
    // Mother validation (if any mother field is filled, require essential fields)
    if (hasMotherInfo) {
      if (!formData.motherFirstName.trim()) newErrors.motherFirstName = 'Mother first name is required';
      if (!formData.motherLastName.trim()) newErrors.motherLastName = 'Mother last name is required';
      if (!formData.motherContactNumber.trim()) newErrors.motherContactNumber = 'Mother contact number is required';
    }
    
    // Father validation (if any father field is filled, require essential fields)
    if (hasFatherInfo) {
      if (!formData.fatherFirstName.trim()) newErrors.fatherFirstName = 'Father first name is required';
      if (!formData.fatherLastName.trim()) newErrors.fatherLastName = 'Father last name is required';
      if (!formData.fatherContactNumber.trim()) newErrors.fatherContactNumber = 'Father contact number is required';
    }
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.motherEmail && !/\S+@\S+\.\S+/.test(formData.motherEmail)) {
      newErrors.motherEmail = 'Please enter a valid email';
    }
    if (formData.fatherEmail && !/\S+@\S+\.\S+/.test(formData.fatherEmail)) {
      newErrors.fatherEmail = 'Please enter a valid email';
    }
    
    // Phone validation
    const phoneFields = ['contactNumber', 'emergencyContact', 'motherContactNumber', 'fatherContactNumber'];
    phoneFields.forEach(field => {
      if (formData[field] && !/^\d{10}$/.test(formData[field].replace(/\D/g, ''))) {
        newErrors[field] = 'Please enter a valid 10-digit contact number';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Form data before submission:', formData);
      
      const data = new FormData();
      
      // Student Details - ensure all fields are strings
      data.append("firstName", formData.firstName || '');
      data.append("lastName", formData.lastName || '');
      data.append("address", formData.address || '');
      data.append("contactNumber", formData.contactNumber || '');
      data.append("email", formData.email || '');
      data.append("grade", formData.grade || '');
      data.append("age", formData.age || '');
      data.append("gender", formData.gender || '');
      data.append("dateOfBirth", formData.dateOfBirth || '');
      data.append("bloodGroup", formData.bloodGroup || '');
      data.append("medicalConditions", formData.medicalConditions || '');
      data.append("emergencyContact", formData.emergencyContact || '');
      
      // Add file only if it exists
      if (formData.qualifications) {
        data.append("qualifications", formData.qualifications);
      }
      
      // Mother Details
      data.append("motherFirstName", formData.motherFirstName || '');
      data.append("motherLastName", formData.motherLastName || '');
      data.append("motherAge", formData.motherAge || '');
      data.append("motherJob", formData.motherJob || '');
      data.append("motherContactNumber", formData.motherContactNumber || '');
      data.append("motherEmail", formData.motherEmail || '');
      data.append("motherAddress", formData.motherAddress || '');
      
      // Father Details
      data.append("fatherFirstName", formData.fatherFirstName || '');
      data.append("fatherLastName", formData.fatherLastName || '');
      data.append("fatherAge", formData.fatherAge || '');
      data.append("fatherJob", formData.fatherJob || '');
      data.append("fatherContactNumber", formData.fatherContactNumber || '');
      data.append("fatherEmail", formData.fatherEmail || '');
      data.append("fatherAddress", formData.fatherAddress || '');

      // Log FormData contents for debugging
      console.log('FormData contents:');
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post('http://localhost:8070/admin/add-student', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 second timeout
      });

      console.log('Response:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.data.status || "Successfully registered student",
        confirmButtonColor: '#1E2A5E'
      });

      // Reset form after success
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        contactNumber: '',
        email: '',
        grade: '',
        age: '',
        gender: '',
        dateOfBirth: '',
        bloodGroup: '',
        medicalConditions: '',
        emergencyContact: '',
        qualifications: null,
        motherFirstName: '',
        motherLastName: '',
        motherAge: '',
        motherJob: '',
        motherContactNumber: '',
        motherEmail: '',
        motherAddress: '',
        fatherFirstName: '',
        fatherLastName: '',
        fatherAge: '',
        fatherJob: '',
        fatherContactNumber: '',
        fatherEmail: '',
        fatherAddress: ''
      });

    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      
      let errorMessage = "Failed to register student";
      
      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.status || err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = "No response from server. Please check if the server is running.";
      } else {
        // Something else happened
        errorMessage = err.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessage,
        confirmButtonColor: '#d33'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      qualifications: null
    }));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 mt-[50px] ml-[-200px] w-[1550px] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-[1500px] ml-[-290px]">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 w-[1500px]">
            <h2 className="text-2xl font-semibold text-white">Student Registration</h2>
            <p className="text-blue-100 mt-1">Complete student information and parent details</p>
          </div>
          
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="p-8 space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter first name"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter last name"
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="5"
                        max="25"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.age ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter age"
                      />
                    </div>
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.gender ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter contact number"
                      />
                    </div>
                    {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter email address"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact *
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Emergency contact number"
                      />
                    </div>
                    {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
                  </div>

                  {/* Blood Group */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group
                    </label>
                    <div className="relative">
                      <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select blood group</option>
                        {bloodGroups.map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter full address"
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                {/* Medical Conditions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Conditions / Allergies (Optional)
                  </label>
                  <textarea
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Any medical conditions, allergies, or special requirements"
                  />
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Academic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Grade */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade *
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.grade ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select grade</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                    {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade}</p>}
                  </div>
                </div>
              </div>

              {/* Parent Details Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Parent / Guardian Information
                  </h3>
                  <p className="text-sm text-gray-500">At least one parent information is required</p>
                </div>
                
                {errors.parentInfo && <p className="text-red-500 text-sm">{errors.parentInfo}</p>}
                
                {/* Parent Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      type="button"
                      onClick={() => setActiveParentTab('mother')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeParentTab === 'mother'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Users className="w-5 h-5 inline mr-2" />
                      Mother Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveParentTab('father')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeParentTab === 'father'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Users className="w-5 h-5 inline mr-2" />
                      Father Details
                    </button>
                  </nav>
                </div>

                {/* Mother Details Tab */}
                {activeParentTab === 'mother' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mother's First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="motherFirstName"
                          value={formData.motherFirstName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.motherFirstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter mother's first name"
                        />
                      </div>
                      {errors.motherFirstName && <p className="text-red-500 text-sm mt-1">{errors.motherFirstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mother's Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="motherLastName"
                          value={formData.motherLastName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.motherLastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter mother's last name"
                        />
                      </div>
                      {errors.motherLastName && <p className="text-red-500 text-sm mt-1">{errors.motherLastName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mother's Age
                      </label>
                      <input
                        type="number"
                        name="motherAge"
                        value={formData.motherAge}
                        onChange={handleInputChange}
                        min="18"
                        max="80"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter mother's age"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mother's Occupation
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="motherJob"
                          value={formData.motherJob}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter mother's occupation"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mother's Contact Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="motherContactNumber"
                          value={formData.motherContactNumber}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.motherContactNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter mother's contact number"
                        />
                      </div>
                      {errors.motherContactNumber && <p className="text-red-500 text-sm mt-1">{errors.motherContactNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mother's Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="motherEmail"
                          value={formData.motherEmail}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.motherEmail ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter mother's email"
                        />
                      </div>
                      {errors.motherEmail && <p className="text-red-500 text-sm mt-1">{errors.motherEmail}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mother's Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          name="motherAddress"
                          value={formData.motherAddress}
                          onChange={handleInputChange}
                          rows="2"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                          placeholder="Enter mother's address"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Father Details Tab */}
                {activeParentTab === 'father' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father's First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="fatherFirstName"
                          value={formData.fatherFirstName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.fatherFirstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter father's first name"
                        />
                      </div>
                      {errors.fatherFirstName && <p className="text-red-500 text-sm mt-1">{errors.fatherFirstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father's Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="fatherLastName"
                          value={formData.fatherLastName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.fatherLastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter father's last name"
                        />
                      </div>
                      {errors.fatherLastName && <p className="text-red-500 text-sm mt-1">{errors.fatherLastName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father's Age
                      </label>
                      <input
                        type="number"
                        name="fatherAge"
                        value={formData.fatherAge}
                        onChange={handleInputChange}
                        min="18"
                        max="80"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter father's age"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father's Occupation
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="fatherJob"
                          value={formData.fatherJob}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter father's occupation"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father's Contact Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="fatherContactNumber"
                          value={formData.fatherContactNumber}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.fatherContactNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter father's contact number"
                        />
                      </div>
                      {errors.fatherContactNumber && <p className="text-red-500 text-sm mt-1">{errors.fatherContactNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father's Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="fatherEmail"
                          value={formData.fatherEmail}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.fatherEmail ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter father's email"
                        />
                      </div>
                      {errors.fatherEmail && <p className="text-red-500 text-sm mt-1">{errors.fatherEmail}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father's Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          name="fatherAddress"
                          value={formData.fatherAddress}
                          onChange={handleInputChange}
                          rows="2"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                          placeholder="Enter father's address"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Qualifications Upload Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Documents (Optional)
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Birth Certificate or Other Documents (PDF only)
                  </label>
                  
                  {!formData.qualifications ? (
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive 
                          ? 'border-blue-500 bg-blue-50' 
                          : errors.qualifications 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drag and drop your PDF file here, or{' '}
                        <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                          browse
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf"
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                          />
                        </label>
                      </p>
                      <p className="text-sm text-gray-500">PDF files only, max 10MB</p>
                    </div>
                  ) : (
                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <span className="text-red-600 font-semibold text-sm">PDF</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{formData.qualifications.name}</p>
                            <p className="text-sm text-gray-500">
                              {(formData.qualifications.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {errors.qualifications && (
                    <p className="text-red-500 text-sm mt-1">{errors.qualifications}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Registering Student...' : 'Register Student'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Studentreg;