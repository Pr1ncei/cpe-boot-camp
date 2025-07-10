import React, { useState } from "react";
import "../styles/LoginStyles.css";
import Button from "../components/button";
import { useNavigate } from "react-router";

const loginUrl = "http://localhost:3140/api/auth/login";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleUserNameInput(event) {
    setUsername(event.target.value);
  }

  function handlePasswordInput() {
    setPassword(event.target.value);
  }

  function handleSubmit() {
    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => {
      console.log("response:", response);
      if(!response.ok){
        throw new Error("Error,", response.status);
      }
      navigate("/home", )
    }).catch((error)=>{
      console.log("Error", error)
    });
  }

  return (
    <div className="login-page">
      <div className="login-page__form">
        <h1>Login</h1>
        <input
          type="text"
          className="login-page__input login-page__input--username"
          onChange={handleUserNameInput}
          placeholder="Username"
        ></input>
        <input
          type={showPassword ? "text" : "password"}
          className="login-page__input  login-page__input--password"
          onChange={handlePasswordInput}
          placeholder="Password"
        ></input>
        <Button onClick={handleSubmit} />
      </div>
    </div>
  );
}
