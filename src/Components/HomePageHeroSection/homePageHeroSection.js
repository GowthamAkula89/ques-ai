import React, { useState, useEffect } from "react";
import "./homePageHeroSection.css";
import HeroImg from "../../Utils/hero.png";
import AddIcon from "../../Utils/Vector.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProject, setProject } from "../Redux/Slices/projects.slice";
import ProjectModal from "../ProjectModal/projectModal";

export const ProjectCard = ({ project }) => (
    <div className="project-card">
        <div className="project-title">{project.projectName.slice(0, 2).toUpperCase()}</div>
        <div className="project-details">
            <div>
                <div className="project-name">{project.projectName}</div>
                <div>{`${project.files.length} Files`}</div>
            </div>
            <div className="project-update">Last edited just now</div>
        </div>
    </div>
);

const HomePageHeroSection = () => {
    const projects = useSelector((state) => state.projects.projects);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate fetching data here. Replace with actual data fetching logic.
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching projects:", error);
                setLoading(false); // Set loading to false in case of error
            }
        };
        fetchData();
    }, []); 

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleProject = (data) => {
        dispatch(setProject(data));
    };

    if (loading) {
        return <div className="loading-message">Loading...</div>; 
    }

    return (
        <>
            {projects.length === 0 ? (
                <div className="hero-container">
                    <div className="hero-heading">Create a New Project</div>
                    <img className="hero-img" src={HeroImg} alt="Hero" />
                    <div className="hero-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in.
                    </div>
                    <div className="create-btn" onClick={handleShowModal}>
                        <img src={AddIcon} alt="Add Icon" className="add-icon" />
                        <div className="create-btn-text">Create New Project</div>
                    </div>
                </div>
            ) : (
                <div className="projects-container">
                    <div className="projects-header">
                        <div className="project-heading">Projects</div>
                        <div className="create-btn" onClick={handleShowModal}>
                            <img src={AddIcon} alt="Add Icon" className="add-icon2" />
                            <div className="create-btn-text2">Create New Project</div>
                        </div>
                    </div>
                    <div className="projects-list">
                        {projects.map((project) => (
                            <Link
                                key={project._id}
                                to="/project"
                                className="project-container"
                                onClick={() => handleProject(project)}
                            >
                                <ProjectCard project={project} />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <ProjectModal showModal={showModal} setShowModal={setShowModal} />
        </>
    );
};

export default HomePageHeroSection;
