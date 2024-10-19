import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageTimeline from "./pages/ManageTimeline";
import ViewProjects from "./pages/ViewProjects";
import UpdateProjects from "./pages/UpdateProjects";

const App = () =>{
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
    </Router>
  );
}