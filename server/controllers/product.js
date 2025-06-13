import Product from "../models/Product.js";

const postProducts = async (req, res) => {
    const {
        name,
        shortDescription,
        longDescription,
        price,
        currentPrice,
        category,
        images,
        tags
    } = req.body;


    const mandatoryFields = ["name", "shortDescription", "longDescription", "price", "category","images"];

    for (const field of mandatoryFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                success: false,
                message: `Field ${field} is required.`
            });
        }
    }
    const newProduct = new Product({
        name,
        shortDescription,
        longDescription,
        price,
        currentPrice,
        category,
        images,
        tags
    });

    try {
        const savedProduct = await newProduct.save();
        return res.status(201).json({
            success: true,
            data: savedProduct,
            message: "Product created successfully."
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

};

const getProducts = async(req,res)=>{

    const {limit} = req.query;

    let {search }= req.query;

    search= search.replaceAll("\\", "");

   const product = await Product.find({
    $or:[
        {
            name:{
                $regex: new RegExp (search || ""),
                $options: "i",
            },
        },
    ]
   }

   ).limit(parseInt(limit || 10)).select("-__v -createdAt -updatedAt");

   return res.status(200).json({
       success: true,
       data: product,
       message: "Products fetched successfully."
   });
};

export { postProducts, getProducts };