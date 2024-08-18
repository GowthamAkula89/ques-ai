import React, { useState } from "react";
import "./uploads.css";
import youtubeImg from "../../Utils/youtube.png";
import rssImg from "../../Utils/rss.png";
import { GoHome } from "react-icons/go";
import { useSelector } from "react-redux";
import UploadModal from "../UploadModal/uploadModal";
import { ListItemCard } from "../ListItemCard/listItemCard";

const uploadTypes = [
    { imgSrc: rssImg, name: "RSS Feed" },
    { imgSrc: youtubeImg, name: "Youtube Video" }
];

export function VideoTypeCard({ item }) {
    return (
        <div className="upload-card">
            <div className="upload-details">
                <div>{item.name}</div>
                <div className="upload-description">Upload the {item.name} file</div>
            </div>
            <img src={item.imgSrc} alt={item.name} className="upload-card-img"/>
        </div>
    );
}


const Uploads = () => {
    const project = useSelector(state => state.projects.project)
    const [selectedType, setSelectedType] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleUpload = (item) => {
        setShowModal(true);
        setSelectedType(item);
    };
    // if(project){
    //     console.log("Files",project.files)
    // }
    console.log("Uploads", project)
    return (
        <>
            <div className="uploads-container">
                <div className="navgation">
                <GoHome className="home-img"/>
                    <div className="nav-text"> / HomePage / {project.projectName} / <span style={{color:"#7E22CE", fontWeight:"600"}}>Add your podcast</span></div>
                </div>
                <div className="uploads-heading">Add Podcast</div>
                <div className="upload-types">
                    {uploadTypes && uploadTypes.map((item, index) => (
                        <div key={index} onClick={() => handleUpload(item)}>
                            <VideoTypeCard item={item} />
                        </div>
                    ))}
                </div>
                {project && project.files?.length !== 0 &&
                    <div className="uploads">
                        <div className="uploads-heading">Your Files</div>
                        <div className="uploads-list">
                            <div className="uploads-list-headings">
                                <div className={`item-slno name-container`}>No.</div>
                                <div className={`item-container2 name-container`}>Name</div>
                                <div className="item-container2">Upload Date & Time</div>
                                <div className="item-container">Status</div>
                                <div className="item-container">Actions</div>
                            </div>
                            <hr style={{ maxWidth: "1120px" }}></hr>
                            {project.files.map((file, index) => (
                                <div key={index}>
                                    <ListItemCard
                                        item={file}
                                        projectId={project._id}
                                        isRequired={index !== project.files.length - 1}
                                        index = {index}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
            {showModal && <UploadModal showModal={showModal} setShowModal={setShowModal} selectedType={selectedType}/>}
        </>
    );
};

export default Uploads;
