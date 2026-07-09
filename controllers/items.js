const mongodb = require("../config/db");

const getAllItems = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("items").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createItem = async (req, res, next) => {
  try {
    const newItem = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      sku: req.body.sku,
      manufacturer: req.body.manufacturer,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("items")
      .insertOne(newItem);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while creating the entry." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllItems, createItem };
