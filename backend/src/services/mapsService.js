import Comment from "../models/comment.js";
import Product from "../models/map.js";
import user from "../models/user.js";

const mapsService = {
  //Comment functionality
  async addComment(productId, userId, text) {
    // Create comment
    const comment = await Comment.create({
      text,
      user: userId,
      product: productId,
    });

    // Add comment ref to Product
    await Product.findByIdAndUpdate(productId, {
      $push: { comments: comment._id },
    });

    // Add comment ref to User
    await user.findByIdAndUpdate(userId, {
      $push: { comments: comment._id },
    });

    return comment;
  },

  // Delete comment
  async deleteComment(commentId, userId) {
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      user: userId,
    });

    if (comment) {
      // Remove from product
      await Product.findByIdAndUpdate(comment.product, {
        $pull: { comments: comment._id },
      });

      // Remove from user
      await user.findByIdAndUpdate(userId, {
        $pull: { comments: comment._id },
      });
    }

    return comment;
  },

  //Like Functionality
  removeLikeUser(productId, userId) {
    return user.findOneAndUpdate(
      { _id: userId },
      { $pull: { likes: productId } },
      { runValidators: true, new: true }
    );
  },

  unlike(productId, userId) {
    return Product.findByIdAndUpdate(
      productId,
      { $pull: { likes: userId } },
      { runValidators: true, new: true }
    );
  },

  addToLikeUser(productId, userId) {
    return user.findByIdAndUpdate(
      userId,
      { $push: { likes: productId } },
      { new: true, runValidators: true }
    );
  },

  like(productId, userId) {
    return Product.findByIdAndUpdate(
      productId,
      { $push: { likes: userId } },
      { new: true, runValidators: true }
    );
  },

  //CRUD Operations

  removeFromUserProduct(userId, productId) {
    return user.findByIdAndUpdate(
      userId,
      { $pull: { posts: productId } },
      {
        runValidators: true,
        new: true,
      }
    );
  },

  removeProduct(productId) {
    return Product.findByIdAndDelete(productId);
  },

  editProduct(petParams, productId) {
    return Product.findByIdAndUpdate(productId, petParams, {
      runValidators: true,
      new: true,
    });
  },

  getOne(productId) {
    return Product.findById(productId)
      .populate("owner")
      .populate({
        path: "comments",
        populate: { path: "user", select: "username" },
      });
  },

  getAll() {
    return Product.find();
  },

  addPostToUser(userId, productId) {
    return user.findByIdAndUpdate(
      userId,
      { $push: { posts: productId } },
      { new: true, runValidators: true }
    );
  },

  create(mapData, userId) {
    return Product.create({ ...mapData, owner: userId });
  },
};

export default mapsService;
