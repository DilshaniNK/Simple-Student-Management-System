
import './App.css';
import Home from './Component/home';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import StudentLogin  from './Component/StudentLogin';
import TeacherLogin from './Component/teacherLogin';
import AdminLogin from './Component/Adminlogin';
import StudentInterface from './Component/StudentInterface';
import Teacherinterface from './Component/teacherinterface';
import Studentreg from './Component/studentreg';
import ViewStudent from './Component/viewStudent';
import Header from './Component/header';
import TeacherReg from './Component/teacherreg';



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
            <Route path='/viewstudent' element={<ViewStudent/>}/>
            <Route path='/teacherreg' element={<TeacherReg/>}/>


            </Routes>
      </Router>
      
      
    </div>
  );  

}

export default App;
