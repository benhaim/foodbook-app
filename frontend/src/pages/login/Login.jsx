import { useRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { gapi } from "gapi-script";

import "./login.css";

const Login = () => {
  const [user, setCurrentUser] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const handleGoogleLogin = async (response) => {
    try {
      console.log("1");
      console.log(response);

      await googleLogin({
        response,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const responseGoogle = (response) => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        plugin_name: "chat",
      });
    });
    handleGoogleLogin(response);
  };

  return (
    <div>
      {" "}
      <div className='login'>
        <h2 className='active'> sign in </h2>

        <h2 className='nonactive' onClick={() => navigate("/register")}>
          {" "}
          sign up{" "}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='input-div'>
            <p>email:</p>
            <input
              type='email'
              ref={emailRef}
              className='text'
              name='email'
            ></input>
          </div>

          <div className='input-div'>
            <p>password:</p>
            <input
              type='password'
              ref={passwordRef}
              className='text'
              name='password'
            ></input>
          </div>
          <button className='signinBtn'>Sign In</button>
          <ToastContainer />
        </form>
        <div className='google-login'>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText='Login with Google'
            onSuccess={responseGoogle}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
