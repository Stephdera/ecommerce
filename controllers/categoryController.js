
const Category = require("../models/category");
const { validateCategory } = require("../validator")

exports.createCategory = async ( req, res ) => {
    try {
        const { error } = validateCategory(req.body)
        if (error) {
            res.json(error.details[0].message)
        }
        const category = new Category({
            name: req.body.name,
            description: req.body.description,
        })

        const new_category_data = await category.save();
        res.json(new_category_data)
    } catch (error) {
        console.log({ message: error.message})
    }
}

exports.getOneCategory =async (req, res ) => {
    const { id } = req.body;
    try {
        const category = await Category.findById(id).populate();
        if (!category) {
            res.status(400).json({ message: "Category doesn't exist"})
        }
        res.json(category);
    } catch (error) {
        console.log({ message: error.message })
    }
}


exports.getAllCategory = async (req, res) => {
    const categories = await Category.find()
    res.json(categories)
}


exports.deleteCategory = async (req, res) => {
    const { id } = req.body;
    try {
        const category = await Category.findByIdAndDelete( id );
        if (!category) {
            return res.status(400).json({ message: "Category not found"});
        }
        res.status(200).json({ message: "Category deleted successfully"});
    } catch (error) {
        console.log({ message: error.message});
    }
}