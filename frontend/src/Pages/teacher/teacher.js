import React from 'react'
import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../Component/Common-Components/SideBar';


const Admin = () => {
    const [isSidebarOpen,setIsSidebarOpen] = useState(false);
    const userRole = 'admin';
    const navigate = useNavigate();
    const location = useLocation();

    const handleSidebarNavigate = (id,path) =>{
        navigate(path);
    };

    const getActiveItem = () => {
        const path = location.pathname;
        if (path.includes('/teacher/interface')) return 'dashboard';
        if(path.includes('/teacher/view_courses')) return 'courses'
        if(path.includes('/teacher/add_courses')) return 'addcourses';
        if(path.includes('/teacher/view_teacher')) return 'allteachers';
        

        return 'dashboard';
    }

  return (
    <div style={{minHeight: '100vh', background: '#f4f6fa'}}>
        <AdminNavbar/>
        <SideBar
            userRole={userRole}
            activeItem={getActiveItem}
            onNavigate={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
        />

        <div style={{marginLeft: 240,padding: 24}}>
              <Routes>
                  
                <Route path='interface' element={<AdminInterface/>}/>
                <Route path='view_courses' element={<Addminviewcourses/>}/>
                <Route path='add_courses' element={<Addcourses/>}/>
                <Route path='add_teacher' element={<TeacherReg/>}/>
                <Route path='view_teacher' element={<TeacherDetails/>}/>
            </Routes>

        </div>
    </div>
  )
}

export default Admin
