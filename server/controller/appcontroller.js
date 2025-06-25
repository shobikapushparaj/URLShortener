const Link = require('../model/schema');

function generateSlug(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
}

exports.createLink = async (req, res) => {
  const { originalUrl, customSlug } = req.body;
  const slug = customSlug || generateSlug();

  try {
    const newLink = new Link({ slug, originalUrl });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(400).json({ error: 'Slug already exists or invalid input' });
  }
};

exports.getAllLinks = async (req, res) => {
  const links = await Link.find();
  res.json(links);
};

exports.updateLink = async (req, res) => {
  const { originalUrl, slug } = req.body;
  try {
    const updated = await Link.findByIdAndUpdate(
      req.params.id,
      { originalUrl, slug },
      { new: true}
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deleteLink = async (req, res) => {
  await Link.findByIdAndDelete(req.params.id);
  res.json({ message: 'Link deleted' });
};

exports.redirectSlug = async (req, res) => {
  const link = await Link.findOne({ slug: req.params.slug });
  if (link) {
    link.clickCount++;
    await link.save();
    res.redirect(link.originalUrl);
  } else {
    res.status(404).send('Not found');
  }
};
