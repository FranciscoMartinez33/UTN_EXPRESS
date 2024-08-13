import { Product } from "../model/mongoDB/product.js";

export const productController = {
    async getAll(req, res) {
        const productCollection = await Product.find();
        productCollection
        ? res.status(200).json({
            succes:true,
            message: "List of products",
            data: productCollection,
        })
        : res
            .status(404)
            .json({ success: false, message: "Movies database empty"});
        
    },
    async getByName(req, res){
        const { nombre } = req.query;
        if (!nombre)
            res
            .status(404)
            .json({ success: false, message: "Missing name query param" });
    
        try {
            const products = await Product.find({
                nombre : { $regex: nombre, $options: "i"},
            });
            if (!products.length) {
                return res.status(404).json({
                    succes: false,
                    message: `No products with ${nombre} in the name`,
                });
            }
            return res.status(200).json({
                succes: true,
                message: "Products by query name",
                data: products,
            });

        } catch(err) {
            return res
            .status(500)
            .json({ success: false, message: `Internal Error: ${err.message}`});
        }    
        },
    async createOne(req,res) {
        const { nombre, precio, disponible, color, talla} = req.body;
        try {
            const newProduct = new Product({
                nombre,
                precio,
                disponible,
                detalles :{
                    color,
                    talla
                }
            });
            const saveProduct = await newProduct.save();
            res
                .status(200)
                .json({ success: true, message: "Product created", data: saveProduct});
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },

    async updateProduct(req, res) {
        const allowedFields = [
            "nombre",
            "precio",
            "disponible",
            "color",
            "talla",
        ];
        try {
            const updates = Object.keys(req.body);
            const isValidOperation = updates.every((update) =>
            allowedFields.includes(update));
            if (!isValidOperation) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid field in the request body. Operation aborted.",
                });
            }
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new:true,
            });
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product Not Found`,
                });
            }
            res
                .status(200)
                .json({ success: true, message: "Product updated", data: product});
        } catch(error) {
            res.status(500).json({
                success: false,
                message: `Internal Server Error ${error.message}`,
            });
        }
    },
    async deleteOne(req,res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if(!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product Not Found`,
                });
            }
            res.send(204);
        } catch (err) {
            res.status(500).json({success:false, message: err.message});
        }
    },
};