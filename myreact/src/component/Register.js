import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [requireUsername, setrequireUsername] = useState("");
  const [requireEmail, setrequireEmail] = useState("");
  const [requirePassword, setrequirePassword] = useState("");
  const [requireConfirmPassword, setrequireConfirmPassword] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const EmptyRegex = (value) => {
    const EmptyValid = /^\s*$/;
    return EmptyValid.test(value);
  };

  const StrongPassword = (password) => {
    const passwordRegex = /(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  const ResetState = (value) => {
    if (value === "username") {
      setrequireUsername("");
    }
    if (value === "email") {
      setrequireEmail("");
    }
    if (value === "password") {
      setrequirePassword("");
    }
    if (value === "confirmpassword") {
      setrequireConfirmPassword("");
    }

    if (value === "mismatch") {
      setPasswordError("");
    }

    if (value === "success") {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordError("");
      setrequireEmail("");
      setrequirePassword("");
      setrequireConfirmPassword("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyusername = EmptyRegex(username);
    const validformatemail = validateEmail(email);
    const emptyemail = EmptyRegex(email);
    const validpassword = StrongPassword(password);
    const emptypassword = EmptyRegex(password);
    const emptyconfirmpassword = EmptyRegex(confirmPassword);

    if (emptyusername) {
      setrequireUsername("Username is required");
    }

    if (!emptyusername) {
      ResetState("username");
    }

    if (emptyemail) {
      ResetState("email");
      setrequireEmail("Email is required");
    }

    if (!validformatemail && !emptyemail) {
      ResetState("email");
      setrequireEmail("Invalid format email.");
    }

    if (validformatemail) {
      ResetState("email");
    }

    if (emptypassword) {
      ResetState("password");
      setrequirePassword("Password is required");
    }

    if (!validpassword && !emptypassword) {
      ResetState("password");
      setrequirePassword("No Strong Password Please Enter");
    }

    if (validpassword) {
      ResetState("password");
    }

    if (emptyconfirmpassword) {
      ResetState("confirmpassword");
      setrequireConfirmPassword("ConfirmPassword is required");
    }

    if (!emptyconfirmpassword) {
      ResetState("confirmpassword");
    }

    if (password !== confirmPassword) {
      ResetState("mismatch");
      setPasswordError("Passwords don't match");
    }

    if (
      !emptyemail &&
      validformatemail &&
      validpassword &&
      !emptypassword &&
      !emptyconfirmpassword &&
      password === confirmPassword
    ) {
      try {
        axios
          .post("http://localhost:3001/api/register", {
            username,
            email,
            password,
          })
          .then((response) => {
            if (response.data["status"] === true) {
              navigate("/login");
            } else {
            }
          });
      } catch {}
      ResetState("success");
    }

    // Passwords match, continue with registration logic
    // ...
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-11 text-center mx-auto">
          <h2>Register</h2>
          <form>
            <div className="form-group mt-3">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {requireUsername && (
                <p
                  style={{ fontSize: "14px", color: "red" }}
                  className="text-start ms-2"
                >
                  {requireUsername}
                </p>
              )}
            </div>
            <div className="form-group mt-3">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {requireEmail && (
                <p
                  style={{ fontSize: "14px", color: "red" }}
                  className="text-start ms-2"
                >
                  {requireEmail}
                </p>
              )}
            </div>
            <div className="form-group mt-3">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {requirePassword && (
                <p
                  style={{ fontSize: "14px", color: "red" }}
                  className="text-start ms-2"
                >
                  {requirePassword}
                </p>
              )}
            </div>
            <div className="form-group mt-3">
              <input
                className="form-control"
                type="password"
                placeholder="Password Confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {requireConfirmPassword && (
                <p
                  style={{ fontSize: "14px", color: "red" }}
                  className="text-start ms-2"
                >
                  {requireConfirmPassword}
                </p>
              )}
              {passwordError && (
                <p
                  style={{ fontSize: "14px", color: "red" }}
                  className="text-start ms-2"
                >
                  {passwordError}
                </p>
              )}
            </div>

            <div className="mt-5 alert alert-warning" role="alert">
     
              Password requirements: 8+ characters, 1 special character, 1 uppercase letter, and 1 digit.
          
            </div>
            <button className="btn btn-primary mt-3" type="submit" onClick={handleSubmit}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
