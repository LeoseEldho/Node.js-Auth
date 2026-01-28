const { uploadCloudinary } = require("../Helper/cloudinaryHelper");
const Image = require("../modules/image");
const { all } = require("../Router/home");
const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    const { url, publicId } = await uploadCloudinary(req.file.path);
    const newImage = await Image.create({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });
    if (newImage) {
      res
        .status(200)
        .json({ message: "The Image has been Uploaded", data: newImage });
    }
  } catch (error) {
    console.log("there are some ", error);
  }
};

const fetchImage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder == "asc" ? 1 : -1;
    const totalImage = await Image.countDocuments();
    const totalPage = Math.floor(totalImage / limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder;
    const allImage = await Image.find().sort(sortObj).skip(skip).limit(limit);
    if (!allImage) {
      return res.status(404).json({ message: "No image are there!" });
    }
    res.status(200).json({
      message: "All Images Are ...",
      currentPage:page,
      totalPage: totalPage,
      totalImage:totalImage,
      data: allImage
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteImage = async (req, res) => {
  const currentImageId = req.params.id;
  const uploadedUser = req.userInfo.userId;

  const isImage = await Image.findById(currentImageId);
  if (!isImage) {
    return res.status(200).json({ message: "Image not found!" });
  }
  if (isImage.uploadedBy.toString() !== uploadedUser) {
    return res.status(404).json({ message: "You can Not Deleter the Image" });
  }
  await cloudinary.uploader.destroy(isImage.publicId); //isImage.publicId
  await Image.findByIdAndDelete(currentImageId);
  res
    .status(200)
    .json({ message: "this Image has been Deleted", data: isImage });
};
module.exports = { uploadImage, fetchImage, deleteImage };
