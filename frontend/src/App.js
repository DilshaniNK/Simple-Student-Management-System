
import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from './pages/Home';
import Roles from './pages/Roles';
import Header from './MyComps/Header';
import About from './pages/About';
import ContactUs from './pages/ContactUs';


import StudentLogin  from './MyComps/StudentComponents/Login';
import TeacherLogin from './MyComps/TeacherComponents/Login';
import AdminLogin from './Component/Adminlogin';
import StudentInterface from './Component/StudentInterface';
import Teacherinterface from './Component/teacherinterface';
import Studentreg from './MyComps/StudentComponents/Register';
import ViewStudent from './Component/viewStudent';
import TeacherReg from './MyComps/TeacherComponents/Register';



function App() {
  return (
    <div className='body-cont'>
      <Router>
          <div className='header'>
            <Header/>
          </div>
          <div className='body-of-app'>

          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/sign-up' element={<Roles />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<ContactUs/>} />


            <Route path="/roles" element={<Roles/>}/>
            <Route path="/studentlogin" element={<StudentLogin/>}/>
            <Route path="/teacherlogin" element={<TeacherLogin/>}/>
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path="/studentinterface" element={<StudentInterface/>}/>
            <Route path="/teacherinterface" element={<Teacherinterface/>}/>
            <Route path='/studentreg' element={<Studentreg/>}/>
            <Route path='/viewstudent' element={<ViewStudent/>}/>
            <Route path='/teacherreg' element={<TeacherReg/>}/>


            </Routes>
          </div>
      </Router>
      
      
    </div>
  );  

}

export default App;
