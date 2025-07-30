import React from 'react'
import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../Component/Common-Components/SideBar';
import AdminInterface from './adminInterface';
import Addminviewcourses from './addminviewcourses';
import Addcourses from './addcourses';
import AdminNavbar from '../../Component/Common-Components/navbar';
import TeacherReg from './teacherreg';
import TeacherDetails from './teacherdetails';

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
        if (path.includes('/admin/interface')) return 'dashboard';
        if(path.includes('/admin/view_courses')) return 'courses'
        if(path.includes('/admin/add_courses')) return 'addcourses';
        if(path.includes('/admin/view_teacher')) return 'allteachers';
        

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
                <Route path='/' element={<AdminInterface/>}/>
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
