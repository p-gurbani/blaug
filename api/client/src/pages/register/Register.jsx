import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import Request from "../../services/Request";

// TODO: Validation

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setReferralCode("");
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const result = await Request.post("/auth/register", {
        username,
        email,
        password,
        referralCode,
      });
      if (result.success) {
        resetForm();
        window.location.reload();
      }
    } catch (err) {}
  };

  return (
    <div className="rg">
      <span className="rg-title">Register</span>
      <form className="rg-form" onSubmit={register}>
        <label htmlFor="usernameinput">Username</label>
        <input
          id="usernameinput"
          type="text"
          placeholder="Enter your username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="emailinput">Email</label>
        <input
          id="emailinput"
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="passwordinput">Password</label>
        <input
          id="passwordinput"
          type="password"
          required
          placeholder="Enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="referralcodeinput">Referral Code</label>
        <input
          id="referralcodeinput"
          type="text"
          required
          placeholder="Enter referral code"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
        />
        <button className="rg-btn" type="submit">
          Register
        </button>
      </form>
      <Link className="link" to="/login">
        <button className="rg-lg-btn">Login</button>
      </Link>
    </div>
  );
};

export default Register;
