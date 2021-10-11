import React from 'react'

import { Link } from "react-router-dom";
import { useStateValue } from '../../StateProvider';
import setJWTtoken from '../securityUtils/setJWTtoken';

const Header = () => {

    const [{validToken, user}, dispatch] = useStateValue();

    const logout = () => {
        localStorage.removeItem("jwtToken");
        setJWTtoken(false);
        dispatch({
          type: "SET_CURRENT_USER",
          decodedToken: {},
      })
      window.location.href = "/";
    }

    return validToken ? (
        <div>
        
             {/* NavBar Component Code */}
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link to="/dashBoard" className="navbar-brand" >
                        Personal Project Management Tool 
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/dashBoard" className="nav-link" >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link " to="/dashBoard">
                                    <i className="fas fa-user-circle mr-1" />
                                        {user.fullName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout" onClick={logout}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    ) : (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand" >
                        Personal Project Management Tool 
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link " to="/register">
                                    Sign Up
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default Header
