import React, {useState} from "react";
import "./projectModal.css";
import Modal from "react-modal";
import { addProject, setProjects } from "../Redux/Slices/projects.slice";
import { useDispatch } from "react-redux";

const ProjectModal = ({showModal, setShowModal}) => {
    const [projectName, setProjectName] = useState("");
    const [loading, setLoading] = useState(false);
    const api = process.env.REACT_APP_QUES_AI_API;
    const dispatch = useDispatch();
    const handleCancel = () => {
        setShowModal(false);
        setProjectName(""); 
    };

    const handleInputChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                setLoading(false);
                return;
            }
            const projectData = {
                "projectName" : projectName
            }
            
            const response = await fetch(`${api}/project/`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, 
                },
                body: JSON.stringify(projectData)
            })

            if (response.ok) {
                const data = await response.json();
                console.log('Project created:', data);
                // setProjects(prevProjects => [...prevProjects, data]);
                dispatch(setProjects(data.projects))
                setShowModal(false);
                setProjectName("");
            } else {
                console.error('Failed to create project:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    return(
        <div>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCancel}
                contentLabel="Create Project Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="modal-container">
                    <div className="create-project-modal-content">
                        <div className="modal-content-heading">Create Project</div>
                        <div className="modal-content-subheading">Enter project name:</div>
                        <input
                            className="create-project-content-input"
                            type="text"
                            name="projectName"
                            placeholder="Type here"
                            value={projectName}
                            onChange={handleInputChange}
                        />
                        <div className="btns">
                            <div className="cancel-btn" onClick={handleCancel}>Cancel</div>
                            <button className="btn" onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Loading...' : 'CREATE'}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default ProjectModal;