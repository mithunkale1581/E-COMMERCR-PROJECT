const { ImageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");


const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await ImageUploadUtil(url);
        res.json({
            success: true,
            message: "Image uploaded successfully",
            result,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Image cannot be uploaded",
        });
    }
};

//add a new product
const addProduct = async (req, res) => {
    try {
        const { image, title, description, price, category, brand, salePrice, totalStock } = req.body;
        const newlyCreatedProduct = new Product({
            title,
            description,
            price,
            category,
            brand,
            salePrice,
            totalStock,
            image,
        });
        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newlyCreatedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Product cannot be added",
        });
    }
}


//fetch all products 
const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: listOfProducts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Products cannot be fetched",
        });
    }
}

//edit a product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, price, category, brand, salePrice, totalStock } = req.body;

        let findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.price = price === '' ? 0 : price || findProduct.price;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;
        await findProduct.save();
        res.status(200).json({
            success: true,
            message: "Product edited successfully",
            data: findProduct
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Product cannot be edited",
        });
    }
}

//delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Product cannot be deleted",
        });
    }
}


module.exports = {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct
};