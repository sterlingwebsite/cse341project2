const mongodb = require("../config/db");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("users").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: err.message || "An error occurred while retrieving users.",
      });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      organization: req.body.organization,
      phoneNumber: req.body.phoneNumber,
      isActive: req.body.isActive,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .insertOne(newUser);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json("Some error occurred while creating the user.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid user id to update.");
    }
    const userId = new ObjectId(req.params.id);
    const updatedUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      organization: req.body.organization,
      phoneNumber: req.body.phoneNumber,
      isActive: req.body.isActive,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .replaceOne({ _id: userId }, updatedUser);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json("Some error occurred while updating the user.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid user id to delete.");
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json("Some error occurred while deleting the user.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
