import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router';
import { useStateValue } from '../../StateProvider';

const Register = () => {
    const [username, setUsername] = new useState("");
    const [fullName, setFullName] = new useState("");
    const [password, setPassword] = new useState("");
    const [confirmPassword, setConfirmPassword] = new useState("");
    const [{errors, validToken}, dispatch] = useStateValue();
    //const [projects, setProjects] = new useState([]);

    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            username: username,
            fullName: fullName,
            password: password,
            confirmPassword: confirmPassword,
        }
        creatNewUser(newUser);
        
    }

    const creatNewUser = async (user) => {
        
        try {
            await axios.post("http://localhost:8080/api/users/register", user);
            dispatch ({
                type: "GET_ERRORS",
                errors: "",
            })
            history.push("/login");
        } catch (err) {
            console.log(err);
            dispatch ({
                type: "GET_ERRORS",
                errors: err.response.data,
            })
        }
        
    }

    useEffect(() => {
        if (validToken) {
            console.log("to Dash Board");
         history.push("/dashBoard");
        }
     }, [validToken]);


    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your Account</p>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Name" name="fullName"
                                    required value={fullName} onChange={(e)=>{setFullName(e.target.value)}} />
                            </div>
                            <div className="form-group">
                                <input type="text" className={`form-control form-control-lg ${errors.username && "is-invalid"}`} placeholder="Email Address" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                                {errors.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input type="password" className={`form-control form-control-lg ${errors.password && "is-invalid"}`} placeholder="Password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input type="password" className={`form-control form-control-lg ${errors.confirmPassword && "is-invalid"}`} placeholder="Confirm Password"
                                    name="confirmPassword" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                                {errors.confirmPassword && (
                                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                                )}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
