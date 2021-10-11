import React, { useEffect, useState } from "react";
import axios from "axios";
import setJWTtoken from "../securityUtils/setJWTtoken";
import jwt_decode from "jwt-decode";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router";

const Login = () => {
  const [username, setUsername] = new useState("");
  const [password, setPassword] = new useState("");

  const [{ errors, validToken }, dispatch] = useStateValue();

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const LoginRequest = {
      username: username,
      password: password,
    };
    login(LoginRequest);
  };

  const login = async (LoginRequest) => {
    try {
      // Post => Login Request
      const res = await axios.post(
        "http://localhost:8080/api/users/login",
        LoginRequest
      );
      dispatch({
        type: "GET_ERRORS",
        errors: "",
      });
      // extract token from res.data
      const { token } = res.data;
      // store the token in the localStorage
      localStorage.setItem("jwtToken", token);
      // set our token in header
      setJWTtoken(token);
      // decode token on React
      const decodedToken = jwt_decode(token);
      // dispatch to datalayer
      dispatch({
        type: "SET_CURRENT_USER",
        decodedToken: decodedToken,
      });
      history.push("/dashBoard");
    } catch (err) {
      console.log(err);
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data,
      });
    }
  };

  useEffect(() => {
    if (validToken) {
      console.log("to Dash Board");
      history.push("/dashBoard");
    }
  }, [validToken]);

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control form-control-lg ${
                    errors.username && "is-invalid"
                  }`}
                  placeholder="Email Address"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
