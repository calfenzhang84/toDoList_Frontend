import React, { useEffect } from "react";
import ProjectTasks from "./ProjectTasks/ProjectTasks";
import axios from "axios";
import { useStateValue } from "../../StateProvider";

const Backlog = ({ projectIdentifier }) => {
  const [{ projectTasks, validToken}, dispatch] = useStateValue();
  const getProjectTasks = async() => {
    try {
      await axios
        .get(`http://localhost:8080/api/backlog/${projectIdentifier}`)
        .then((response) => {
          console.log(response.data);
          dispatch({
            type: "GET_BACKLOG",
            projectTasks: response.data,
          });
        });
    } catch (err) {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data,
      });
    }
  };
  useEffect(() => {
      console.log(">>>>>>>>>Fetch");
      if (validToken){
        getProjectTasks();
      }

  }, [validToken]);

  let todoItems = [];
  let inProgressItems = [];
  let doneItems = [];

  projectTasks.forEach((projectTask) => {
    if (projectTask.status === "TO_DO") {
      todoItems.push(projectTask);
    } else if (projectTask.status === "IN_PROGRESS") {
      inProgressItems.push(projectTask);
    } else if (projectTask.status === "DONE") {
      doneItems.push(projectTask);
    }
  });

  return projectTasks.length !== 0 ? (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-secondary text-white">
              <h3>TO DO</h3>
            </div>
          </div>

          {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
          {todoItems.map((projectTask) => (
            <ProjectTasks
              key={projectTask.projectSequence}
              projectTask={projectTask}
              projectIdentifier={projectIdentifier}
            />
          ))}

          {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
        </div>
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-primary text-white">
              <h3>In Progress</h3>
            </div>
          </div>
          {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
          {inProgressItems.map((projectTask) => (
            <ProjectTasks
              key={projectTask.projectSequence}
              projectTask={projectTask}
              projectIdentifier={projectIdentifier}
            />
          ))}

          {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
        </div>
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-success text-white">
              <h3>Done</h3>
            </div>
          </div>
          {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
          {doneItems.map((projectTask) => (
            <ProjectTasks
              key={projectTask.projectSequence}
              projectTask={projectTask}
              projectIdentifier={projectIdentifier}
            />
          ))}
          {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
        </div>
      </div>
    </div>
  ) : (
    <div className="alert alert-info text-center" role="alert">
        No Project Tasks on this board
    </div>

  );
};

export default Backlog;
