import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
    const { name, category, image, price, description } = req.body;
    try {
        const product = new Product({
            name,
            category,
            image,
            price,
            description
        });
        await product.save();
        return res.status(201).json({ message: 'Product has been created successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
