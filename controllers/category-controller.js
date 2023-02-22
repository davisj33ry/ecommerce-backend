const { Category, Product } = require('../../models');

const categoryController = {
  // get all categories
  getAllCategories(req, res) {
    Category.findAll({
      // include its associated Products
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    })
      .then((dbCategoryData) => res.json(dbCategoryData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get one category by id
  getCategoryById(req, res) {
    Category.findOne({
      where: {
        id: req.params.id,
      },
      // include its associated Products
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    })
      .then((dbCategoryData) => {
        if (!dbCategoryData) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
        }
        res.json(dbCategoryData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // create a new category
  createCategory(req, res) {
    Category.create({
      category_name: req.body.category_name,
    })
      .then((dbCategoryData) => res.json(dbCategoryData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // update a category by id
  updateCategory(req, res) {
    Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((dbCategoryData) => {
        if (!dbCategoryData) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
        }
        res.json(dbCategoryData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete a category by id
  deleteCategory(req, res) {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbCategoryData) => {
        if (!dbCategoryData) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
        }
        res.json(dbCategoryData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = categoryController;
