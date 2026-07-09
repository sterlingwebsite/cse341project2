const mongodb = require("../config/db");
const { ObjectId } = require("mongodb");

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

const updateItem = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Must use a valid MongoDB item ID to update an item.",
      });
    }
    const itemId = new ObjectId(req.params.id);
    const updatedItem = {
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
      .replaceOne({ _id: itemId }, updatedItem);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "No item found with that ID or no new changes provided.",
      });
    }
  } catch (err) {
    next(err);
  }
};

// DELETE /items/:id - Removes a document matching the ID
const deleteItem = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Must use a valid MongoDB item ID to delete an item.",
      });
    }
    const itemId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("items")
      .deleteOne({ _id: itemId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(404)
        .json({ message: "No item found with that ID to delete." });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllItems, createItem, updateItem, deleteItem };
