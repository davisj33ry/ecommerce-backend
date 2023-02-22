const { Product, Category, Tag, ProductTag } = require('../models');

const getProductById = async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: ProductTag, as: 'tags' },
      ],
    });

    if (!productData) {
      res.status(404).json({ message: `No product found with id ${req.params.id}` });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: ProductTag, as: 'tags' },
      ],
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(201).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!productData[0]) {
      res.status(404).json({ message: `No product found with id ${req.params.id}` });
      return;
    }

    res.status(200).json({ message: `Product with id ${req.params.id} has been updated.` });
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: `No product found with id ${req.params.id}` });
      return;
    }

    res.status(200).json({ message: `Product with id ${req.params.id} has been deleted.` });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getProductById, getAllProducts, createProduct, updateProduct, deleteProduct };
