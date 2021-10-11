import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios"
import { useStateValue } from "../../../StateProvider";

const ProjectTasks = ({ projectTask, projectIdentifier }) => {
  const [{validToken}, dispatch] = useStateValue();
  const projectSequence = projectTask.projectSequence;
  
  const  deleteProjectTask = async (projectIdentifier, projectSequence) => {
    if (window.confirm("Are you sure?")) {
        await axios.delete(`http://localhost:8080/api/backlog/${projectIdentifier}/${projectSequence}`);
        dispatch ({
            type: "DELETE_PROJECT_TASK",
            projectSequence: projectSequence,
        })
    }
    
  }


  let priorityString;

  if (projectTask.priority === 1) {
    priorityString = "HIGH";
  }

  if (projectTask.priority === 2) {
    priorityString = "MEDIUM";
  }

  if (projectTask.priority === 3) {
    priorityString = "LOW";
  }



  return (
    <div className="card mb-1 bg-light">
      <div
        className={`card-header text-primary ${
          projectTask.priority === 1 && "bg-danger text-light"
        } ${projectTask.priority === 2 && "bg-warning text-light"} ${
          projectTask.priority === 3 && "bg-info text-light"
        }`}
      >
        ID: {projectSequence} -- Priority: {priorityString}
      </div>
      <div className="card-body bg-light">
        <h5 className="card-title">{projectTask.summary}</h5>
        <p className="card-text text-truncate ">
          {projectTask.acceptanceCriteria}
        </p>
        <Link to={`/updateProjectTask/${projectIdentifier}/${projectSequence}`} className="btn btn-primary">
          View / Update
        </Link>

        <button className="btn btn-danger ml-4" onClick={() => deleteProjectTask(projectIdentifier, projectSequence)}>Delete</button>
      </div>
    </div>
  );
};

export default ProjectTasks;
