import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ProjectItem from "./Project/ProjectItem";
import axios from "axios";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";

const Dashboard = () => {
  console.log(">>>>>>>>>>Dashboard");
  const [{ projects, validToken }, dispatch] = useStateValue();
  const getProjects = () => {
    axios.get("http://localhost:8080/api/project/all").then((response) => {
      console.log(response.data);
      dispatch({
        type: "GET_PROJECTS",
        projects: response.data,
      });
      dispatch({
        type: "GET_ERRORS",
        errors: "",
      });
    });
  };
  useEffect(() => {
    if (validToken) {
      getProjects();
      console.log(">>>>>>>>>>Get Fetch");
    }
  }, [validToken]); // whenever refresh, dispatch token happened in app.js file(app.js always get loaded)

  return (
    <div>
      {/* Dashboard Component (Project Item included)  */}

      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <Link to="/addProject" className="btn btn-lg btn-info">
                Create a Project
              </Link>
              <br />
              <hr />
            </div>
          </div>
        </div>
      </div>
      {/* {Object.keys(projects).map(i => (
                <ProjectItem project={projects[i]}/>
            ))} */}
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Dashboard;
