import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Profile from "./component/Profile";
import Navbar from "./component/Navbar";

import "./App.css";

function App() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  return (
      <Router>
        <div>
          <Navbar/>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
