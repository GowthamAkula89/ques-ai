import React, { useState } from "react";
import "./uploadModal.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { setProject } from "../Redux/Slices/projects.slice";

const UploadModal = ({ showModal, setShowModal, selectedType }) => {
    const project = useSelector(state => state.account.project);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleCancel = () => {
        setShowModal(false);
        setName("");
        setDescription("");
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async () => {
        if (name === "" || description === "") {
            enqueueSnackbar("Please fill in all the fields", { variant: "warning" });
            return;
        }
        
        setLoading(true);
        const file = {
            fileName: name,
            fileDescription: description
        };

        const api = process.env.REACT_APP_QUES_AI_API;
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                setLoading(false);
                return;
            }
            const response = await fetch(`${api}/project/${project._id}/files`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(file)
            });
            if (!response.ok) {
                enqueueSnackbar("Failed to upload the file to the project", { variant: "error" });
                setLoading(false);
                return;
            }
            const data = await response.json();
            console.log("File uploaded data:", data);
            enqueueSnackbar("File uploaded successfully", { variant: "success" });
            dispatch(setProject(data));
            handleCancel();
        } catch (err) {
            console.error("Upload error:", err);
            enqueueSnackbar("An error occurred while uploading the file", { variant: "error" });
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCancel}
                contentLabel="Upload Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="modal-container">
                    <div className="create-project-modal-content">
                        <div className="modal-heading">
                            <img src={selectedType.imgSrc} alt="img" className="selected-type-img" />
                            <div>{`Upload from ${selectedType.name}`}</div>
                        </div>
                        <div className="modal-content-subheading">Name:</div>
                        <input
                            className="create-project-content-input"
                            type="text"
                            name="name"
                            placeholder="Type here"
                            value={name}
                            onChange={handleNameChange}
                        />
                        <div className="modal-content-subheading">Description:</div>
                        <input
                            className="create-project-content-input"
                            type="text"
                            name="description"
                            placeholder="Type here"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <div className="btns">
                            <div className="cancel-btn" onClick={handleCancel}>Cancel</div>
                            <button className="btn" onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Loading...' : 'UPLOAD'}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UploadModal;
