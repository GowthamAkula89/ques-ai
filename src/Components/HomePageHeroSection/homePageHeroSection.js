import React, { useState, useEffect } from "react";
import "./homePageHeroSection.css";
import HeroImg from "../../Utils/hero.png";
import AddIcon from "../../Utils/Vector.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProjects, setProject } from "../Redux/Slices/projects.slice";
import ProjectModal from "../ProjectModal/projectModal";
import AccountSetting from "../AccountSetting/accountSetting";
import Logo from "../Logo/logo";
    
const formatTime = (time) => {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    console.log("Time", time)
    const formattedTime = new Date(time).toLocaleString('en-IN', options);
    return formattedTime;
}

export const ProjectCard = ({ project }) => (
    <div className="project-card">
        <div className="project-title">{project.projectName.slice(0, 2).toUpperCase()}</div>
        <div className="project-details">
            <div>
                <div className="project-name">{project.projectName}</div>
                <div>{`${project.files.length} Episodes`}</div>
            </div>
            <div className="project-update">Last edited {formatTime(project.updatedAt)}</div>
        </div>
    </div>
);

const HomePageHeroSection = () => {
    const account = useSelector((state) => state.account.account);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const api = process.env.REACT_APP_QUES_AI_API;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    setLoading(false);
                    return;
                }
    
                const response = await fetch(`${api}/project/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, 
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
    
                const data = await response.json();
                dispatch(setProjects(data.projects));
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [dispatch, api]);

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
            {account.length === 0 ? (
                <div className="hero-container">
                    <div className="hero-header">
                        <Logo/>
                        <AccountSetting/>
                    </div>
                    <div className="hero-heading">Create a New Project</div>
                    <img src={HeroImg} alt="Hero"  className="hero-img"/>
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
                    <div className="page-header">
                        <Logo/>
                        <AccountSetting/>
                    </div>
                    <div className="projects-header">
                        <div className="project-heading">Projects</div>
                        <div className="create-btn" onClick={handleShowModal}>
                            <img src={AddIcon} alt="Add Icon" className="add-icon2" />
                            <div className="create-btn-text2">Create New Project</div>
                        </div>
                    </div>
                    <div className="projects-list">
                        {account.map((project) => (
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
