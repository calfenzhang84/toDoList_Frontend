import React from 'react'
import Backlog from './Backlog'
import {Link, useParams} from "react-router-dom"
import { useStateValue } from '../../StateProvider';

const ProjectBoard = () => {
    const {id} = useParams();
    const [{errors}, dispatch] = useStateValue();
    console.log(errors);
    return (!errors.projectIdentifier && !errors.projectNotFound )? (

            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                <Backlog projectIdentifier={id} /> 
            </div>

    ) : errors.projectIdentifier ? (
        <div className="alert alert-danger text-center" role="alert" >
            {errors.projectIdentifier}
        </div>
        
    ) : (
        <div className="alert alert-danger text-center" role="alert" >
            {errors.projectNotFound}
        </div>
    )
}

export default ProjectBoard



