const cloudinary = require('../config/cloudinary');

const uploadCloudinary = async(filepath) =>{
    try {
        const result = await cloudinary.uploader.upload(filepath);
        return {
            url:  result.secure_url,
            publicId: result.public_id  ,
        };
    } catch (error) {
        console.log(error,"Uploading the file Failed")
    }
};
module.exports={uploadCloudinary}