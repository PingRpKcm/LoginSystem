import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [Datauser, setDatauser] = useState([]);
  const username = useSelector((state) => state.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("asd");
    const fetchData = async () => {
      try {
        await axios
          .post("http://localhost:3001/api/profile", { username })
          .then((response) => {
            if (response.data["status"] === true) {
              setDatauser(response.data["message"]);
            } else {
            }
          });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, [username]);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div style={{backgroundColor: '#E8E8E8', borderRadius:'25px'}} className="col-11 text-center jumbotron py-4">
          <h2 className="display-4"><b>Profile</b></h2>
          <p class="lead">Welcome to your profile!</p>
          <hr class="my-4"/>
          {Datauser.map((user) => (
            <div key={user.username}>
              <label><b>Username</b></label>
              <p>{username}</p>
              <label><b>Email</b></label>
              <p>{user.email}</p>
              <label><b>Create Time</b></label>
              <p>{user.create_date}</p>
              <label><b>Update Time</b></label>
              <p>{user.update_date}</p>
            </div>
          ))}
          <button className="btn btn-danger my-3" onClick={handleLogout}> Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
