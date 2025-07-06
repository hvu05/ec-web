// file component: UploadImage
import axios from "axios";
import { useState } from "react";
import { URL_WEB } from "../../constants";
import "./UploadImage.scss";

function UploadImage({ ownerType, ownerId, onUploaded }) {

    const handleUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return


        try {
            const formData = new FormData()
            formData.append("file", (file)) // file upload
            formData.append("fileType", ('image')) // optional
            formData.append("ownerType", String(ownerType))
            formData.append("ownerId", String(ownerId))

            console.log('FILE:', file)

            const token = localStorage.getItem("token")
            console.log('upload anh', token)
            const response = await axios.post(`${URL_WEB}/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            // console.log('IMAGE URL; ',response.data)
            onUploaded(response.data.data.url)
            return response.data.data.url
        } catch (error) {
            console.error('Upload error:', error);
        } 
    };

    return (
            <input type="file" accept="image/*" onChange={handleUpload} />
    );
}

export default UploadImage
