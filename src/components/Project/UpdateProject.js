import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { useStateValue } from '../../StateProvider';


const UpdateProject = () => {

    const [dataId, setDataId] = useState("")
    const [projectName, setProjectName]=useState("");
    const [projectIdentifier, setProjectIdentifier]=useState("");
    const [description, setDescription]=useState("");
    const [startDate, setsStartDate]=useState("");
    const [endDate, setEndDate]=useState("");
    const { id } = useParams();
    const history = useHistory();
    const [{errors, validToken}, dispatch] = useStateValue();


    const getProject = async () => {
        try{
            await axios.get(`http://localhost:8080/api/project/${id}`).then(response => {
                console.log(response.data);
                const theProject = response.data;
                setDataId(theProject.id);
                setProjectName(theProject.projectName); 
                setProjectIdentifier(theProject.projectIdentifier);
                setDescription(theProject.description);
                setsStartDate(theProject.startDate);
                setEndDate(theProject.endDate);
            })
        }catch(err){
            dispatch({
                type: "GET_ERRORS",
                errors: err.response.data,
            })
        }
        
    }
    useEffect(() => {
        if(validToken) {
            getProject();
        }
        
    }, [validToken]) // [] did not load the current page even refresh the current page
    


    const onSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            id: dataId,
            projectName: projectName,
            projectIdentifier: projectIdentifier,
            description: description,
            startDate: startDate,
            endDate: endDate,
        }
        updateProject(newProject);
    }

    const updateProject = async (project) => {
        try {
            await axios.post ("http://localhost:8080/api/project", project);
            history.push("/dashBoard");
            dispatch ({
                type: "GET_ERRORS",
                errors: "",
            })
        }catch(err){
            dispatch ({
                type: "GET_ERRORS",
                errors: err.response.data,
            })
        }
    }

    return (
        
        <div>
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
                                    <input type="text" className={`form-control form-control-lg ${errors.projectIdentifier && "is-invalid"}`} placeholder="Unique Project ID" name="projectIdentifier" value={projectIdentifier} onChange={e=>setProjectIdentifier(e.target.value)} disabled/>
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

export default UpdateProject
