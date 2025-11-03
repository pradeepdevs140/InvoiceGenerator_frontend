import axios from 'axios';

export const uploadImage = async(imagedata)=>{
    const formData = new FormData();
    formData.append("file", imagedata);
    formData.append("upload_preset", "InvoiceThumbnail");
    formData.append("cloud_name", "duakihcbd");
    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/duakihcbd/image/upload`, 
        formData
    );
      return response.data.secure_url;
}
