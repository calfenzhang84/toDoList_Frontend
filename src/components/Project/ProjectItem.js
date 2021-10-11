import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link,  } from "react-router-dom";
import axios from "axios";
import { useStateValue } from '../../StateProvider';

const ProjectItem = ({project}) => { //{projectName, projectIdentifier, description, startDate, endDate}
    console.log(project);
    const [{}, dispatch] = useStateValue();
    const deleteProject = (id) => {
            if (window.confirm("Are you sure?")) {
                axios.delete(`http://localhost:8080/api/project/${id}`);
                dispatch ({
                    type: "DELETE_PROJECT",
                    id: id,
                })
            }
    }
    return (
        <div>
            {/* Project Item Component  */}
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <span className="mx-auto">{project.projectIdentifier}</span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>{project.projectName}</h3>
                            <p>{project.description}</p>
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                            <ul className="list-group">
                                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                                    <li className="list-group-item board" >
                                        <HomeIcon style={{color:"#007bff"}} />
                                        <i className="fa fa-flag-checkered pr-1">Project Board </i>
                                    </li>
                                </Link>
                                <Link to={`/updateProject/${project.projectIdentifier}`}>
                                    <li className="list-group-item update">
                                        <EditIcon style={{color:"#18a2b9"}} />
                                        <i className="fa fa-edit pr-1">Update Project Info</i>
                                    </li>
                                </Link>                           
                                <li className="list-group-item delete" onClick={() => deleteProject(project.projectIdentifier)}>
                                    <DeleteIcon color="secondary" />
                                    <i className="fa fa-minus-circle pr-1">Delete Project</i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectItem
