import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageTimeline from "./pages/ManageTimeline";
import ViewProjects from "./pages/ViewProjects";
import UpdateProjects from "./pages/UpdateProjects";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import ManageSkills from "./pages/ManageSkills";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slices/userSlices";

 export const App = () =>{

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUser)
    },[])

  return (    

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/manage/skills" element={<ManageSkills />} />
        <Route path="/manage/timeline" element={<ManageTimeline />} />
        <Route path="/view/project/:id" element={<ViewProjects />} />
        <Route path="/update/project/:id" element={<UpdateProjects />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark"/>
    </Router>

  );
}