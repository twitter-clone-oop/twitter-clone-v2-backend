const Post = require("../models/Post");
const User = require("../models/User");

exports.postPost = async (req, res, next) => {
  const post = {
    postedBy: req.userId,
    content: req.body.content,
  };

  try {
    let createdPost = await Post.create(post);
    createdPost = await Post.findById(createdPost._id).populate("postedBy");
    res.status(201).send({ messagge: `Post created!`, createdPost });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.getPosts = async (req, res, next) => {
  let searchObj = {};

  const followingOnly = req.query.followingOnly === "true";

  if (followingOnly) {
    const objectIds = [];

    try {
      const user = await User.findById(req.userId);
      if (!user.following) {
        user.following = [];
      }

      user.following.forEach((user) => {
        objectIds.push(user);
      });
      objectIds.push(user._id); // own post

      searchObj.postedBy = { $in: objectIds };

      const posts = await getPostsFromDB(searchObj, next);
      res.send(posts);
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
        next(error);
      }
    }
  }
};

const getPostsFromDB = async (filter, next) => {
  try {
    let result = await Post.find(filter)
      .populate("postedBy")
      .sort({ createdAt: -1 });

    result = await User.populate(result, { path: "replyTo.postedBy" });
    return await User.populate(result, { path: "retweetData.postedBy" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.patchPost = async (req, res, next) => {
  const patchLogs = {};
  try {
    if (req.body.pinned) {
      let prevPinnedPost = await Post.findOne({ pinned: true }).populate(
        "postedBy"
      );
      const prevPinnedPostId = prevPinnedPost._id;

      await Post.updateMany({ postedBy: req.userId }, { pinned: false });

      // prevPinnedPost = await Post.findById(prevPinnedPostId).populate(
      //   "postedBy"
      // );

      prevPinnedPost.pinned = false;

      patchLogs.prevPinnedPost = prevPinnedPost;

      let currentPinnedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        req.body,
        { new: true }
      );
      currentPinnedPost = await Post.populate(currentPinnedPost, "postedBy");
      patchLogs.currentPinnedPost = currentPinnedPost;
      res.status(201).json(patchLogs);
    }

    if (req.body.likes) {
      const postId = req.params.postId;
      const userId = req.userId;

      let user = await User.findById(userId);
      const isLiked = user.likes && user.likes.includes(postId);

      let option = isLiked ? "$pull" : "$addToSet";
      user = await User.findByIdAndUpdate(
        userId,
        { [option]: { likes: postId } },
        { new: true }
      );

      let post = await Post.findByIdAndUpdate(
        postId,
        { [option]: { likes: userId } },
        { new: true }
      );
      res.status(200).json(post);
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};