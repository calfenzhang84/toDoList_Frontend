import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectsBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectsBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectsBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import setJWTtoken from "./components/securityUtils/setJWTtoken";


function App() {
  console.log("Start>>>>>>>>");

  const [{ validToken, user }, dispatch] = useStateValue();
  const jwtToken = localStorage.jwtToken;
  console.log(jwtToken);
  const checkToken = () => {
    if (jwtToken) {
      setJWTtoken(jwtToken);
      // decode token on React
      const decodedToken = jwt_decode(jwtToken);
      // dispatch to datalayer
      dispatch({
        type: "SET_CURRENT_USER",
        decodedToken: decodedToken,
      });
      console.log(">>>>>>>>>dispatch user finished", user);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        logout();
        window.location.href = "/";
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setJWTtoken(false);
    dispatch({
      type: "SET_CURRENT_USER",
      decodedToken: {},
    });
  };

  useEffect(() => {
    checkToken();
  }, []); // this page always get load during refresh

  return validToken ? (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          {/* private Routes */}

          <Route exact path="/addProject">
            <AddProject />
          </Route>
          <Route exact path="/dashBoard">
            <Dashboard />
          </Route>
          <Route exact path="/updateProject/:id">
            <UpdateProject />
          </Route>
          <Route exact path="/projectBoard/:id">
            <ProjectBoard />
          </Route>
          <Route exact path="/addProjectTask/:id">
            <AddProjectTask />
          </Route>
          <Route exact path="/updateProjectTask/:id/:ps">
            <UpdateProjectTask />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <Router>
      {/* public Routes */}
      <Header />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/dashBoard">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
