import "./App.css";
import Home from "./Component/home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import Admin from "./Pages/Admin/Admin";
import Teacherinterface from "./Component/teacherinterface";
import Teacher from "./Pages/teacher/teacher";

// import StudentLogin from './Component/StudentLogin';
// import TeacherLogin from './Component/teacherLogin';
// import AdminLogin from './Component/Adminlogin';
// import StudentInterface from './Component/StudentInterface';
// import Teacherinterface from './Component/teacherinterface';
// import Studentreg from './Component/studentreg';
// import Header from './Component/header';
// import TeacherReg from './Component/teacherreg';
// import Addcourses from './Component/addcourses';
// import Viewcourse from './Component/viewcourse';
// import Deletecourse from './Component/deletecourse';
// import Adminreg from './Component/adminreg';
// import AdminInterface from './Component/adminInterface';
// import Addminviewcourses from './Component/addminviewcourses';
// import ViewAssignmentdetails from './Component/ViewAssignmentdetails';
// import About from './Component/About';
// import MyHome from './Component/MyHome';
// import ViewAssignment from './Component/TeacherViewAssignment';
// import ContactUs from './HomeComps/ContactUs/ContactUs2';
// import Addmarks from './Component/addmarks';
// import AdminViewTeachers from './Component/viewteachers';
// import AddTeacher from './Component/Addteacher';  // Adjust the path as needed
// import AddStudent from './Component/teacheraddstudents'; // Adjust the path as needed

// function AppRoutes() {
//   const location = useLocation();

//   // Hide Header if path contains '/admin'
//   const hideHeader =   location.pathname.startsWith("/admin") ||
//     location.pathname.startsWith("/teacher");

//   return (
//     <>
//       {!hideHeader && <Header />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<MyHome />} />
//         <Route path="/studentlogin" element={<StudentLogin />} />
//         <Route path="/teacherlogin" element={<TeacherLogin />} />
//         <Route path="/adminlogin" element={<AdminLogin />} />
//         <Route path="/studentinterface" element={<StudentInterface />} />
//         <Route path="/teacherinterface" element={<Teacherinterface />} />
//         <Route path="/studentreg" element={<Studentreg />} />
//         <Route path="/teacherreg" element={<TeacherReg />} />
//         <Route path="/add-course" element={<Addcourses />} />
//         <Route path="/view-courses" element={<Viewcourse />} />
//         <Route path="/teacher-add-marks" element={<Addmarks />} />
//         <Route path="/delete-course" element={<Deletecourse />} />
//         <Route path="/adminreg" element={<Adminreg />} />
//         <Route path="/admininterface" element={<AdminInterface />} />
//         <Route path="/admin-view-courses" element={<Addminviewcourses />} />
//         <Route path="/viewassignment" element={<ViewAssignmentdetails />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/teacherviewassignment" element={<ViewAssignment />} />
//         <Route path="/addcourses" element={<Addcourses />} />
//         <Route path="/adminviewteachers" element={<AdminViewTeachers />} />
// <Route path="/addteacher" element={<AddTeacher />} />
//         <Route path="/teacher-view-course" element={<Viewcourse />} />
//         <Route path="/teacher-add-student" element={<AddStudent/>} />

//       </Routes>
//     </>
//   );
// }

function App() {
  return (
    <Router>
      {/* <AppRoutes /> */}
      <Routes>
        <Route path="admin/*" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="teacher/*" element={<Teacher />} />
      </Routes>
    </Router>
  );
}

export default App;
