const router = require("express").Router();
const tags = require("./../models/tagsModel");
const { findByID } = require("./../controllers/product");
const { findBytag } = require("./../controllers/tags");

router.post("/", async (req, res) => {
  const entries = await tags.findOne({ name: req.body.name });

  if (entries) {
    entries.items.push(req.body.items);
    await entries.save();
    res.json(entries);
  }
  else {
    const entry = new tags(req.body);
    try {
      await entry.save();
    } catch (err) {
      res.status(500).json({ err });
    }
    res.json({ entry });
  }
});

router.post("/find", async (req, res) => {
  var results = await findBytag(req.body.name);
  results = await findByID(results);
  res.send(results);
});

module.exports = router;
