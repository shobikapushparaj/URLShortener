const Link = require('../model/Link');

function generateSlug(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
}

exports.createLink = async (req, res) => {
  const { originalUrl, customSlug, userId } = req.body;
  const slug = customSlug || generateSlug();

  try {
    const newLink = new Link({ slug, originalUrl, userId });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(400).json({ error: 'Slug already exists or invalid input' });
  }
};

exports.getAllLinks = async (req, res) => {
  const { userId } = req.query;
  try {
    const links = await Link.find({ userId });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user links' });
  }
};


exports.updateLink = async (req, res) => {
  const { originalUrl, slug, userId } = req.body;

  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(403).json({ error: 'link not found' });
    }

    link.originalUrl = originalUrl;
    link.slug = slug;
    const updated = await link.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deleteLink = async (req, res) => {
  const { userId } = req.body;

  try {
    const link = await Link.findByIdAndDelete(req.params.id);
    res.json({ message: 'Link deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
};

exports.redirectSlug = async (req, res) => {
  try {
    const link = await Link.findOne({ slug: req.params.slug });
    if (link) {
      link.clickCount++;
      await link.save();
      return res.redirect(link.originalUrl);
    } else {
      res.status(404).send('not found');
    }
  } catch (err) {
    res.status(500).send('server error');
  }
};
