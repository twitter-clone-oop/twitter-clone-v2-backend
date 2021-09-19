const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const postController = require("../controllers/post");

router.post("/", auth, postController.postPost);

router.get("/posts", auth, postController.getPosts);

router.patch("/:postId", auth, postController.patchPost);

router.delete("/:postId", auth, postController.deletePost);

module.exports = router;
