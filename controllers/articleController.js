let models = require('../models/productModels.js');
let Article = models.Article;

let getArticle = async (req, res, next) => {
  try {
    let article = await Article.findById(req.params.articleId);
    res.send(article);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let postArticle = async (req, res, next) => {
  let article = new Article({
    sku: req.body.sku,
    ean: req.body.ean,
    name: req.body.name,
    stockQuantity: req.body.stockQuantity,
    price: req.body.price
  });
  try {
    let result = await article.save();
    res.status(201).json(result);
  } catch (err) {
    if (err && err.code === 11000) {
      res.status(500).send({error: 'Duplicate article is not allowed'});
    } else {
      res.status(500).send({error: err.message});
    }
  }
};

let deleteArticle = async (req, res, next) => {
  try {
    await Article.findById(req.params.articleId).remove();
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let getAllArticles = async (req, res, next) => {
  try {
    let results = await Article.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let putCategoriestoArticle = async (req, res, next) => {
  res.status(501).send('Method Not Implemented!');
};

module.exports = {
  getArticle: getArticle,
  postArticle: postArticle,
  deleteArticle: deleteArticle,
  getAllArticles: getAllArticles,
  putCategoriestoArticle: putCategoriestoArticle
};