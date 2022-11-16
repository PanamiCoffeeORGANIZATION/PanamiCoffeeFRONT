import { cloudinaryImages } from "../api/cloudinary";

export const uploadImage = async files => {
    const formData = new FormData()
    formData.append("file", files)
    formData.append("upload_preset", 'm8xbe6bu')

    return await cloudinaryImages(formData);
}

export const deleteImage = async name => {

    

}