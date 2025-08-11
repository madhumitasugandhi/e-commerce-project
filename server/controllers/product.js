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

const getProducts = async (req, res) => {
  try {
    let { limit, search = "" } = req.query;

    // Ensure limit is a number or default 100
    const parsedLimit = Number(limit) || 100;

    // Ensure search is a string
    if (typeof search !== "string") {
      search = "";
    }

    search = search.replaceAll("\\", "");

    const products = await Product.find({
      $or: [
        {
          name: {
            $regex: new RegExp(search, "i"),
          },
        },
      ],
    })
      .limit(parsedLimit)
      .select("-__v -createdAt -updatedAt");

    return res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully.",
    });
  } catch (error) {
    console.error("Error in getProducts:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export { postProducts, getProducts };