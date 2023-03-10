import Post from "../models/Post.js";
import UserInfo from "../models/UserInfo.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, story, imagePath } = req.body;
    const user = await UserInfo.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      story,
      profilePicturePath: user.profilePicturePath,
      imagePath,
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
