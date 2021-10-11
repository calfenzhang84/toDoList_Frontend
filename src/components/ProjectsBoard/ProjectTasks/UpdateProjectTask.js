import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import axios from "axios";

const UpdateProjectTask = () => {
  const { id, ps } = useParams();

  const history = useHistory();
  const [{ errors, validToken }, dispatch] = useStateValue();
  const [dataId, setDataId] = useState("");
  const [summary, setSummary] = useState("");
  const [acceptanceCriteria, setAceptanceCriteria] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState(0);
  const [dueDate, setDueDate] = useState("");

  const getProjectTask = async () => {
    try {
      await axios
        .get(`http://localhost:8080/api/backlog/${id}/${ps}`)
        .then((response) => {
          console.log(response.data);
          setDataId(response.data.id);
          setSummary(response.data.summary);
          setAceptanceCriteria(response.data.acceptanceCriteria);
          setStatus(response.data.status);
          setPriority(response.data.priority);
          setDueDate(response.data.dueDate);
        });
    } catch (err) {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data,
      });
    }
  };

  useEffect(() => {
    if (validToken) {
      getProjectTask();
      console.log(">>>>>>>>", validToken);
    }
  }, [validToken]);

  const onSubmit = (e) => {
    e.preventDefault();
    const projectTask = {
      //   projectIdentifier: id,
      //   projectSequence: ps,
      id: dataId,
      summary: summary,
      acceptanceCriteria: acceptanceCriteria,
      status: status,
      priority: priority,
      dueDate: dueDate,
    };
    updateProjectTask(projectTask); // another thread was initialized because of async
    console.log(">>>>>>>>>updated DONE"); // step 1
  };

  const updateProjectTask = async (projectTask) => {
    try {
      await axios
        .patch(`http://localhost:8080/api/backlog/${id}/${ps}`, projectTask)
        .then((response) => {
          console.log(">>>>>>>>>data saved"); // step 2, if not using await, this would pop out anywhere bewtween following
        });
      console.log(">>>>>>>>before history"); // step 3
      history.push(`/projectBoard/${id}`); // step 4
      console.log(">>>>>>>>>after history");
      dispatch({
        type: "GET_ERRORS",
        errors: "",
      });
    } catch (err) {
      dispatch({
        type: "GET_ERRORS",
        errors: err.response.data,
      });
    }
  };

  return errors === "" ? (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${id}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Add Project Task</h4>
            <p className="lead text-center">
              Project Name {id} + Project Code {ps}
            </p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control form-control-lg ${
                    errors.summary && "is-invalid"
                  }`}
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
  ) : (
    <div className="alert alert-danger text-center" role="alert">
      {errors.projectNotFound}
    </div>
  );
};

export default UpdateProjectTask;
