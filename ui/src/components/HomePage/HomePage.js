import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getUsers } from "../../services/userServices";
import { Footer } from "../Common/Footer/Footer";
import Navbar from "../Common/Navbar/Navbar";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      getUsers()
        .then((response) => {
          setUsers(response);
        })
        .catch((e) => console.log("err", e));
    } else {
      setLocation("/login");
    }
  }, [setLocation]);

  return (

    <div>
      <Navbar/>
      <h1>HOME PAGE</h1>
      {users.map((user) => (
        <h2>{user.username}</h2>
      ))}
      <Footer/>
    </div>
  );
};

export default HomePage;
