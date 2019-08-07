const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db("posts");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "error getting posts", error: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [post] = await db("posts").where({ id });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "error getting post with id", error: error });
  }
});

router.post("/", async (req, res) => {
  const postData = req.body;
  try {
    const post = await db("posts").insert(postData);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "couldn't do it", error: error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await db("posts")
      .where({ id })
      .update(changes);
    if (cont) {
      res.status(200).json({ message: "woohoo! it worked!" });
    } else {
      res.status(404).json({ message: "that's not a post id" });
    }
  } catch (error) {
    res.status(500).json({ message: "error updating" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db("posts")
      .where({ id })
      .del();
    if (deleted) {
      res.status(200).json({ message: "you deleted it!" });
    } else {
      res
        .status(404)
        .json({ message: "can't delete a post that doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "error deleting" });
  }
});

module.exports = router;
