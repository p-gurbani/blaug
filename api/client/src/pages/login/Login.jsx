import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { Context } from "../../context/Context";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../../context/Actions";
import Request from "../../services/Request";
import toast from "react-hot-toast";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(Context);

  const login = async (e) => {
    e.preventDefault();
    dispatch(loginRequest());
    try {
      const result = await Request.post("/auth/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      if (result.success) {
        dispatch(loginSuccess(result.user));
      } else {
        toast.error("Wrong username or password");
        dispatch(loginFailure());
      }
    } catch (error) {
      toast.error("Wrong username or password");
      dispatch(loginFailure());
    }
  };

  return (
    <div className="lg">
      <span className="lg-title">Login</span>
      <form className="lg-form" onSubmit={login}>
        <label htmlFor="usernameinput">Username</label>
        <input
          id="usernameinput"
          type="text"
          placeholder="Enter your username"
          ref={usernameRef}
        />
        <label htmlFor="passwordinput">Password</label>
        <input
          id="passwordinput"
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <button className="lg-btn" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <Link className="link" to="/register">
        <button className="lg-reg-btn">Register</button>
      </Link>
    </div>
  );
};

export default Login;
