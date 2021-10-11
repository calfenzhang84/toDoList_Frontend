import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { useStateValue } from '../../StateProvider';
import axios from "axios";

const AddProject = () => {
    const [projectName, setProjectName]=useState("");
    const [projectIdentifier, setProjectIdentifier]=useState("");
    const [description, setDescription]=useState("");
    const [startDate, setsStartDate]=useState("");
    const [endDate, setEndDate]=useState("");

    const [{errors}, dispatch] = useStateValue();

    const onSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            projectName: projectName,
            projectIdentifier: projectIdentifier,
            description: description,
            startDate: startDate,
            endDate: endDate,
        }
        createProject(newProject);
    }

    const history = useHistory();
    const createProject = async (project) => {
        try {
             await axios.post ("http://localhost:8080/api/project", project);
             dispatch({
                type: "GET_ERRORS",
                errors: "",
              });
             history.push("/dashBoard")
        }catch(err){
            dispatch ({
                type: "GET_ERRORS",
                errors: err.response.data,
            })
        }
    }



    return (
        <div>
            {/* {Object.keys(errors).map(i => (
                <h1>{errors[i]}</h1>
            ))} */}
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr />
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={`form-control form-control-lg ${errors.projectName && "is-invalid"}`} placeholder="Project Name" name="projectName" value={projectName} onChange={e=>setProjectName(e.target.value)}/>
                                    {errors.projectName && (
                                        <div className="invalid-feedback">{errors.projectName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="text" className={`form-control form-control-lg ${errors.projectIdentifier && "is-invalid"}`} placeholder="Unique Project ID" name="projectIdentifier" value={projectIdentifier} onChange={e=>setProjectIdentifier(e.target.value)}/>
                                    {errors.projectIdentifier && (
                                        <div className="invalid-feedback">{errors.projectIdentifier}</div>
                                    )}
                                </div>
                                {/* <!-- disabled for Edit Only!! remove "disabled" for the Create operation --> */}
                                <div className="form-group">
                                    <textarea className={`form-control form-control-lg ${errors.description && "is-invalid"}`} placeholder="Project Description" name="description" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
                                    {errors.description && (
                                        <div className="invalid-feedback">{errors.description}</div>
                                    )}
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="startDate" value={startDate} onChange={e=>setsStartDate(e.target.value)}/>
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="endDate" value={endDate} onChange={e=>setEndDate(e.target.value)}/>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProject
