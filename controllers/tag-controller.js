const { Tag, Product, ProductTag } = require('../models');

const tagController = {
  // Get all tags
  getAllTags: async (req, res) => {
    try {
      const tags = await Tag.findAll({
        include: { model: Product },
      });
      res.json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while getting tags' });
    }
  },

  // Get one tag by id
  getTagById: async (req, res) => {
    const { id } = req.params;
    try {
      const tag = await Tag.findByPk(id, {
        include: { model: Product },
      });
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json(tag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while getting the tag' });
    }
  },

  // Create a new tag
  createTag: async (req, res) => {
    try {
      const tag = await Tag.create(req.body);
      res.status(201).json(tag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the tag' });
    }
  },

  // Update an existing tag
  updateTag: async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await Tag.update(req.body, {
        where: { id },
      });
      if (!updated) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      const updatedTag = await Tag.findByPk(id);
      res.json(updatedTag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the tag' });
    }
  },

  // Delete a tag
  deleteTag: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Tag.destroy({
        where: { id },
      });
      if (!deleted) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while deleting the tag' });
    }
  },
};

module.exports = tagController;
