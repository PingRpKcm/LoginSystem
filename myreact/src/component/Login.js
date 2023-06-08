import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUsernameStore } from "../redux/store";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [requireUsername, setrequireUsername] = useState("");
  const [requirePassword, setrequirePassword] = useState("");
  
  const [alertLogin, setalertLogin] = useState("")

  const EmptyRegex = (value) => {
    const EmptyValid = /^\s*$/;
    return EmptyValid.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyusername = EmptyRegex(username);
    const emptypassword = EmptyRegex(password);

    if (emptyusername) {
      setrequireUsername("Username is required");
    }

    if (!emptyusername) {
      setrequireUsername("");
    }

    if (emptypassword) {
      setrequirePassword("Password is required");
    }

    if (!emptypassword) {
      setrequirePassword("");
    }

    if (!emptyusername && !emptypassword)
      try {
        axios
          .post("http://localhost:3001/api/login", { username, password })
          .then((response) => {
            if (response.data["status"] === true) {
              dispatch({ type: "LOGIN_SUCCESS" });
              dispatch(setUsernameStore(username));
              navigate("/profile");
            } else {
              setalertLogin("Invalid Username or Password!")
            }
          });
        // Handle success
      } catch (error) {
        setalertLogin("The system is improving")
        // Handle error
      }

  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-8 text-center mx-auto">
          <h2>Login</h2>
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
            {alertLogin && (
                <p
                  style={{ fontSize: "14px", color: "red" }}
                  className="text-start ms-2"
                >
                  {alertLogin}
                </p>
              )}
            <button
              className="btn btn-primary mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
