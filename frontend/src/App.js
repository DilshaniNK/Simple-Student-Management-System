
import './App.css';
import Home from './Component/home';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import StudentLogin  from './Component/StudentLogin';
import TeacherLogin from './Component/teacherLogin';
import AdminLogin from './Component/Adminlogin';
import StudentInterface from './Component/StudentInterface';
import Teacherinterface from './Component/teacherinterface';
import Studentreg from './Component/studentreg';
// import ViewStudent from './Component/viewStudent';
import Header from './Component/header';
import TeacherReg from './Component/teacherreg';
import Addcourses from './Component/addcourses';
import Viewcourse from './Component/viewcourse';
import Deletecourse from './Component/deletecourse';
import Adminreg from './Component/adminreg';
import AdminInterface from './Component/adminInterface';
import Addminviewcourses from './Component/addminviewcourses';
import ViewAssignmentdetails from './Component/ViewAssignmentdetails';



function App() {
  return (
    <div>
      <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/studentlogin" element={<StudentLogin/>}/>
            <Route path="/teacherlogin" element={<TeacherLogin/>}/>
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path="/studentinterface" element={<StudentInterface/>}/>
            <Route path="/teacherinterface" element={<Teacherinterface/>}/>
            <Route path='/studentreg' element={<Studentreg/>}/>
            {/* <Route path='/viewstudent' element={<ViewStudent/>}/> */}
            <Route path='/teacherreg' element={<TeacherReg/>}/>
            <Route path='/add-course' element={<Addcourses/>}/>
            <Route path='/view-courses' element={<Viewcourse/>}/>
            <Route path='/delete-course' element={<Deletecourse/>}/>
            <Route path='/adminreg'element={<Adminreg/>}/>
            <Route path='/admininterface' element={<AdminInterface/>}/>
            <Route path='/addmin-view-courses' element={<Addminviewcourses/>}/>
            <Route path='/viewassignment' element={<ViewAssignmentdetails/>}/>


            </Routes>
      </Router>
      
      
    </div>
  );  

}

export default App;
