import React, { useState } from "react";
import "./uploads.css";
import youtubeImg from "../../Utils/youtube.png";
import rssImg from "../../Utils/rss.png";
import { GoHome } from "react-icons/go";
import { useSelector } from "react-redux";
import UploadModal from "../UploadModal/uploadModal";
import { ListItemCard } from "../ListItemCard/listItemCard";
import { useNavigate } from "react-router-dom";
import UploadImg from "../../Utils/ic_upload.png"
const uploadTypes = [
    { imgSrc: rssImg, name: "RSS Feed" },
    { imgSrc: youtubeImg, name: "Youtube Video" },
    {imgSrc:UploadImg, name: "Upload Files"}
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
    const project = useSelector(state => state.account.project)
    const [selectedType, setSelectedType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleUpload = (item) => {
        setShowModal(true);
        setSelectedType(item);
    };
    // if(project){
    //     console.log("Files",project.files)
    // }
    // console.log("Uploads", project)
    return (
        <>
            <div className="uploads-container">
                <div className="navgation">
                <GoHome className="home-img"/>
                    <div className="nav-text"> / <span onClick={() => navigate("/homepage")}>HomePage</span> / <span onClick={()=> navigate("/project")}>{project.projectName}</span> / <span style={{color:"#7E22CE", fontWeight:"600"}}>Add your podcast</span></div>
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
                                <div className={`item-slno name-container cell-size`}>No.</div>
                                <div className={`item-container2 name-container cell-size`}>Name</div>
                                <div className="item-container2 cell-size">Upload Date & Time</div>
                                <div className="item-container cell-size">Status</div>
                                <div className="item-container cell-size">Actions</div>
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
