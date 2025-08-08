import React from 'react'
import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../Component/Common-Components/SideBar';
import Teacherinterface from './teacherinterface';
import AdminNavbar from '../../Component/Common-Components/navbar';
import ViewAssignment from './TeacherViewAssignment';
import Addmarks from './addmarks';
import TeacherAnnouncements from './teacherAnnouncements';



const Teacher = () => {
    const [isSidebarOpen,setIsSidebarOpen] = useState(false);
    const userRole = 'teacher';
    const navigate = useNavigate();
    const location = useLocation();

    const handleSidebarNavigate = (id,path) =>{
        navigate(path);
    };

    const getActiveItem = () => {
        const path = location.pathname;
        if (path.includes('/teacher/interface')) return 'dashboard';
        if(path.includes('/teacher/view_assigments')) return 'assigments'
        if (path.includes('/teacher/Addmarks')) return 'addmarks';
        if (path.includes('/teacher/announcements')) return 'announcements';
        // if(path.includes('/teacher/view_teacher')) return 'allteachers';
        

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
                  
                <Route path='interface' element={<Teacherinterface/>}/>
                <Route path='view_assigments' element={<ViewAssignment/>}/>
                <Route path='Addmarks' element={<Addmarks/>}/>
                <Route path='announcements' element={<TeacherAnnouncements/>}/>
                {/* <Route path='view_teacher' element={<TeacherDetails/>}/> */}
            </Routes>

        </div>
    </div>
  )
}

export default Teacher
