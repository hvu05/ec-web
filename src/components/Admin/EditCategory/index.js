//file: EditCategory.js
import { useEffect, useState } from "react";
import './EditCategory.scss';
import UploadImage from '../../UploadImage';
import axios from "axios";
import { URL_WEB } from "../../../constants";
import { message } from "antd";

function EditCategory(props) {
    const [id, setId] = useState(props.id)
    const [name, setName] = useState(props.name)
    const [description, setDescription] = useState(props.description)
    const [urlImage, setUrlImage] = useState(props.urlImage)
    const [loading, setLoading] = useState(false)
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
        if (name === "description") setDescription(value)
        if (name === "url") setUrlImage(value)
    };

    // Hàm này sẽ được gọi sau khi UploadImage upload thành công
    const handleImageUploaded = (newImageUrl) => {
        setUrlImage(newImageUrl) 
    };

    const HandleSubmitForm = async(e) => {
        e.preventDefault()
        setLoading(true)

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
            
            message.success('Category updated successfully!')
            props.onClose()
        }
        catch(err) {
            console.error("Error updating category:", err);
            message.error('Failed to update category. Please try again.');
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="edit-category__overlay" onClick={props.onClose}>
            <div className="edit-category__modal" onClick={(e) => e.stopPropagation()}>
                <button className="edit-category__close-btn" onClick={props.onClose}>×</button>
                
                <div className="edit-category__header">
                    <h2>Edit Category</h2>
                    <p>Update your category information below</p>
                </div>
                
                <form className="edit-category__form">
                    <div className="form-group">
                        <label htmlFor="name">Category Name</label>
                        <input
                            id="name"
                            name="name"
                            value={name}
                            onChange={HandleChange}
                            placeholder="Enter category name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={HandleChange}
                            placeholder="Enter category description"
                            required
                        />
                    </div>

                    <div className="upload-section">
                        <label className="upload-label">Upload Image</label>
                        <p className="upload-hint">Click to upload a new image for this category</p>
                        <UploadImage
                            ownerType="CATEGORY"
                            ownerId={id}
                            onUploaded={handleImageUploaded} 
                        />
                    </div>

                    {urlImage && (
                        <div className="image-preview">
                            <span className="preview-label">Current Image Preview:</span>
                            <img
                                src={urlImage}
                                alt="Category preview"
                            />
                        </div>
                    )}
                    
                    <div className="form-actions">
                        <button type="button" onClick={props.onClose}>
                            Cancel
                        </button>
                        <button type="submit" onClick={HandleSubmitForm} disabled={loading}>
                            {loading ? 'Updating...' : 'Update Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCategory;
