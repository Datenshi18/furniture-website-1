const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer, folder = 'furniture') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      folder,
      resource_type: 'image',
    }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    }).end(buffer);
  });
};

const destroyFromCloudinary = async (publicId) => {
  if (!publicId) return;
  return cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
};

module.exports = { cloudinary, uploadToCloudinary, destroyFromCloudinary };