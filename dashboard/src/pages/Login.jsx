import { LoginForm } from "../components/LoginForm";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { loading, isAuthenticated, error, message } = useSelector(
//     (state) => state.user
//   ); // to access slice

//   const dispatch = useDispatch();
//   const navigateTo = useNavigate();

//   const handleLogin = () =>{
//     dispatch(login(email,password));
//   }

//   useEffect(()=>{
//     if(error){
//         toast.error(error);
//         dispatch(clearAllUserErrors());
//     }

//     if(isAuthenticated){
//         navigateTo("/");
//     }
//   },[dispatch, isAuthenticated, error, loading]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
};

export default Login;
