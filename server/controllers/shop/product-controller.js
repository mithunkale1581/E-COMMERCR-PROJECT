const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {

    try {

        const {
            category = [],
            brand = [],
            sortBy = "price-lowtohigh"
        } = req.query;

        let filters = {};

        if (category.length) {
            filters.category = { $in: category.split(",") };
        }

        if (brand.length) {
            filters.brand = { $in: brand.split(",") };
        }

        let sort = {};

        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1;
                break;
            case "price-hightolow":
                sort.price = -1;
                break;
            case "title-atoz":
                sort.title = 1;
                break;
            case "title-ztoa":
                sort.title = -1;
                break;
            default:
                sort.price = 1;
        }

        const products = await Product.find(filters).sort(sort);
        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            data: products,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }
        res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            data: product,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

module.exports = { getFilteredProducts, getProductDetails };