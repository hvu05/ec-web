//file: EditCategory.js
import { useEffect, useState } from "react";
import './EditCategory.scss';
import UploadImage from '../../components/UploadImage'; // đảm bảo đúng path
import axios from "axios";
import { URL_WEB } from "../../constants";

function EditCategory(props) {
    const [id, setId] = useState(props.id)
    const [name, setName] = useState(props.name)
    const [description, setDescription] = useState(props.description)
    const [urlImage, setUrlImage] = useState(props.urlImage)
    const token = localStorage.getItem('token')

    useEffect(() => {
        setId(props.id)
        setName(props.name)
        setDescription(props.description)
        setUrlImage(props.urlImage)

    }, [props.id, props.name, props.description, props.urlImage])

    const HandleChange = (e) => {
        const { name, value } = e.target
        if (name === "name") setName(value)
        if (name === "des") setDescription(value)
        if (name === "url") setUrlImage(value)
    };

    // Hàm này sẽ được gọi sau khi UploadImage upload thành công
    const handleImageUploaded = (newImageUrl) => {
        setUrlImage(newImageUrl) 
        // console.log("HIHI", newImageUrl)
        // const url = await handleUpload()
    };
    const HandleSubmitForm = async(e) => {
        e.preventDefault()

        try {
            const res = await axios.put(`${URL_WEB}/category/${id}`, {
                name, description, urlImage
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            props.onUpdateCategory({
                id, name, description, urlImage
            })
        }
        catch(err) {
            console.error("Error updating category:", err);
            alert("Cập nhật thất bại");
        }
        props.onClose()
    }
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-btn" onClick={props.onClose}>×</button>
                <h2>Edit Category</h2>
                <form >
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        value={name}
                        onChange={HandleChange}
                        placeholder="Category name"
                    />

                    <label htmlFor="des">Description</label>
                    <input
                        name="des"
                        value={description}
                        onChange={HandleChange}
                        placeholder="Description"
                    />

                    <label>Upload Image</label>
                    {/* 
                        HOW TO WAY UPLOAD A IMAGE
                            - Call UploadImage component with 3 para 
                            - Imple HandleImageUpload func to set URL IMAGE
                    */}
                    <UploadImage
                        ownerType="CATEGORY"
                        ownerId={id}
                        onUploaded={handleImageUploaded} 
                    />

                    {urlImage && (
                        <img
                            src={urlImage}
                            alt="Preview"
                            style={{ width: "200px", marginTop: "10px" }}
                        />
                    )}
                    <button type="submit" onClick={HandleSubmitForm}>Submit</button>
                </form>
            </div>
            {/* {console.log('URL image',urlImage)} */}
        </div>
    );
}

export default EditCategory;
