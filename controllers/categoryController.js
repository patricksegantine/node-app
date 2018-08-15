let models = require('../models/productModels.js');

// TBD: Improvement - Create a Factory for all types of controllers

let Category = models.Category;

let getCategory = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.categoryName);
    if (!category) {
      res.status(404).send({error: 'Resource Not Found'});
    } else {
      res.send(category);
    }
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let postCategory = async (req, res, next) => {
  let category = new Category({
    _id: req.body.name,
    articles: req.body.articles,
    parent: req.body.parent || null
  });
  try {
    let result = await category.save();
    res.status(201).json(result);
  } catch (err) {
    if (err && err.code === 11000) {
      res.status(500).send({error: 'Duplicate category is not allowed'});
    } else {
      res.status(500).send({error: err.message});
    }
  };
};

let deleteCategory = async (req, res, next) => {
  console.log(req.params.categoryName);
  try {
    await Category.findById(req.params.categoryName).remove();
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: err.message});
  }
};

let getAllCategoris = async (req, res, next) => {
  try {
    let results = await Category.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let putCategory = async (req, res, next) => {
  res.status(501).send('Method Not Implemented!');
};

module.exports = {
  getCategory: getCategory,
  postCategory: postCategory,
  deleteCategory: deleteCategory,
  getAllCategoris: getAllCategoris,
  putCategory: putCategory
};
