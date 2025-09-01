import React, { useState } from 'react';
import { Plus, Users, Calendar, MapPin, User, X, Edit, Trash2 } from 'lucide-react';

const Clubandsociaty = () => {
  const [activeTab, setActiveTab] = useState('clubs');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [specialClasses, setSpecialClasses] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    instructor: '',
    location: '',
    schedule: '',
    capacity: '',
    type: ''
  });



  const [selectedStudents, setSelectedStudents] = useState([]);

  const getCurrentData = () => {
    switch (activeTab) {
      case 'clubs': return clubs;
      case 'societies': return societies;
      case 'specialClasses': return specialClasses;
      default: return [];
    }
  };

  const setCurrentData = (data) => {
    switch (activeTab) {
      case 'clubs': setClubs(data); break;
      case 'societies': setSocieties(data); break;
      case 'specialClasses': setSpecialClasses(data); break;
    }
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) return;
    
    const currentData = getCurrentData();
    const newId = Math.max(...currentData.map(item => item.id), 0) + 1;
    const item = {
      ...newItem,
      id: newId,
      capacity: parseInt(newItem.capacity) || 0,
      enrolled: 0,
      members: []
    };
    
    setCurrentData([...currentData, item]);
    setNewItem({ name: '', description: '', instructor: '', location: '', schedule: '', capacity: '' });
    setShowAddModal(false);
  };

  const handleAssignStudents = () => {
    if (!selectedItem || selectedStudents.length === 0) return;
    
    const currentData = getCurrentData();
    const updatedData = currentData.map(item => {
      if (item.id === selectedItem.id) {
        const newMembers = [...new Set([...item.members, ...selectedStudents])];
        return {
          ...item,
          members: newMembers,
          enrolled: newMembers.length
        };
      }
      return item;
    });
    
    setCurrentData(updatedData);
    setSelectedStudents([]);
    setShowAssignModal(false);
    setSelectedItem(null);
  };

  const handleRemoveMember = (itemId, memberName) => {
    const currentData = getCurrentData();
    const updatedData = currentData.map(item => {
      if (item.id === itemId) {
        const newMembers = item.members.filter(member => member !== memberName);
        return {
          ...item,
          members: newMembers,
          enrolled: newMembers.length
        };
      }
      return item;
    });
    setCurrentData(updatedData);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'clubs': return 'Clubs';
      case 'societies': return 'Societies';
      case 'specialClasses': return 'Special Classes';
      default: return '';
    }
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case 'clubs': return 'Add Club';
      case 'societies': return 'Add Society';
      case 'specialClasses': return 'Add Special Class';
      default: return 'Add Item';
    }
  };

  return (
    // <div className="min-h-screen bg-gray-50 w-[1500px] ml-[-160px] p-6">
      <div className=" mx-auto mt-[60px] w-[1500px] ml-[-150px]">
       

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'clubs', label: 'Clubs', icon: Users },
                { id: 'societies', label: 'Societies', icon: Users },
                { id: 'specialClasses', label: 'Special Classes', icon: Calendar }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">{getTabTitle()}</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus size={20} />
                <span>{getAddButtonText()}</span>
              </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentData().map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User size={16} />
                      <span>{item.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin size={16} />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      <span>{item.schedule}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users size={16} />
                      <span>{item.enrolled}/{item.capacity} students</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(item.enrolled / item.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Members */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Members ({item.members.length})</h4>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {item.members.map((member, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{member}</span>
                          <button
                            onClick={() => handleRemoveMember(item.id, member)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowAssignModal(true);
                    }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Assign Students
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{getAddButtonText()}</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                />
                <input
                  type="text"
                  placeholder="Instructor"
                  value={newItem.instructor}
                  onChange={(e) => setNewItem({...newItem, instructor: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newItem.location}
                  onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Schedule"
                  value={newItem.schedule}
                  onChange={(e) => setNewItem({...newItem, schedule: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  value={newItem.capacity}
                  onChange={(e) => setNewItem({...newItem, capacity: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assign Students Modal */}
        {showAssignModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Assign Students to {selectedItem.name}</h3>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Available Students:</h4>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {availableStudents
                    .filter(student => !selectedItem.members.includes(student))
                    .map((student) => (
                    <label key={student} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudents([...selectedStudents, student]);
                          } else {
                            setSelectedStudents(selectedStudents.filter(s => s !== student));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">{student}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedStudents([]);
                  }}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignStudents}
                  disabled={selectedStudents.length === 0}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Assign ({selectedStudents.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    // </div>
  );
};



export default Clubandsociaty
