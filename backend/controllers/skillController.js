const Skill = require('../models/Skill');

/**
 * GET /api/skills
 */
exports.getSkills = async (_req, res) => {
  try {
    const skills = await Skill.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch skills.', error: error.message });
  }
};

/**
 * GET /api/skills/:id
 */
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate('userId', 'name email');
    if (!skill) return res.status(404).json({ message: 'Skill not found.' });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch skill.', error: error.message });
  }
};

/**
 * POST /api/skills
 */
exports.createSkill = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || price === undefined) {
      return res.status(400).json({ message: 'Title, description and price are required.' });
    }

    const skill = await Skill.create({
      title,
      description,
      price,
      userId: req.user._id
    });

    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create skill.', error: error.message });
  }
};

/**
 * PUT /api/skills/:id
 */
exports.updateSkill = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const skill = await Skill.findById(req.params.id);

    if (!skill) return res.status(404).json({ message: 'Skill not found.' });

    // Ensure a user can only modify their own listing.
    if (skill.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this skill.' });
    }

    if (title !== undefined) skill.title = title;
    if (description !== undefined) skill.description = description;
    if (price !== undefined) skill.price = price;

    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update skill.', error: error.message });
  }
};

/**
 * DELETE /api/skills/:id
 */
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) return res.status(404).json({ message: 'Skill not found.' });

    if (skill.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this skill.' });
    }

    await skill.deleteOne();
    res.json({ message: 'Skill deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete skill.', error: error.message });
  }
};
