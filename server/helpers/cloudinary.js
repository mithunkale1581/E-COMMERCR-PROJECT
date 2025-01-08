const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dhw3iltfu',
    api_key: '263318286742793',
    api_secret: 'wTNff3wa8UDhiuYiK4DE5oi9GVc',
});

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    });
    return result;
}

const upload = multer({ storage });

module.exports = {
    ImageUploadUtil,
    upload,
};