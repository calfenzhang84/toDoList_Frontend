import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../../../StateProvider";

const AddProjectTask = () => {
  const { id } = useParams();
  const history = useHistory();
  const [{ errors }, dispatch] = useStateValue("");
  const [summary, setSummary] = useState("");
  const [acceptanceCriteria, setAceptanceCriteria] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState(0);
  const [dueDate, setDueDate] = useState("");
  // const [endDate, setEndDate]=useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const projectTask = {
      projectIdentifier: id,
      summary: summary,
      acceptanceCriteria: acceptanceCriteria,
      status: status,
      priority: priority,
      dueDate: dueDate,
    };
    addProjectTask(projectTask);
  };

  const addProjectTask = async (projectTask) => {
    try {
      await axios.post(`http://localhost:8080/api/backlog/${id}`, projectTask);
      dispatch({
        type: "GET_ERRORS",
        errors: "",
      });
      history.push(`/projectBoard/${id}`);
    } catch (err) {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data,
      });
    }
  };

  return (
      
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${id}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Add Project Task</h4>
            <p className="lead text-center">Project Name + Project Code</p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control form-control-lg ${errors.summary && "is-invalid"}`}
                  placeholder="Project Task summary"
                  name="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
                <div className="invalid-feedback">{errors.summary}</div>
                {errors.summary && (
                    <div className="is-invalid">{errors.summary}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={acceptanceCriteria}
                  onChange={(e) => setAceptanceCriteria(e.target.value)}
                ></textarea>
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
  
                </select>
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectTask;
