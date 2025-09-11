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

  //Favourite Functionality
  favourite(productId, userId) {
    return Product.findByIdAndUpdate(
      productId,
      { $addToSet: { favourites: userId } },
      { new: true, runValidators: true }
    );
  },

  unFavourite(productId, userId) {
    return Product.findByIdAndUpdate(
      productId,
      { $pull: { favourites: userId } },
      { new: true, runValidators: true }
    );
  },

  addToFavouriteUser(productId, userId) {
    return user.findByIdAndUpdate(
      userId,
      { $addToSet: { favourite: productId } },
      { new: true, runValidators: true }
    );
  },

  removeFavouriteUser(productId, userId) {
    return user.findByIdAndUpdate(
      userId,
      { $pull: { favourite: productId } },
      { new: true, runValidators: true }
    );
  },

  //Like Functionality
  like(productId, userId) {
    return Product.findByIdAndUpdate(
      productId,
      { $addToSet: { likes: userId } },
      { new: true, runValidators: true }
    );
  },

  unlike(productId, userId) {
    return Product.findByIdAndUpdate(
      productId,
      { $pull: { likes: userId } },
      { new: true, runValidators: true }
    );
  },

  addToLikeUser(productId, userId) {
    return user.findByIdAndUpdate(
      userId,
      { $addToSet: { likes: productId } },
      { new: true, runValidators: true }
    );
  },

  removeLikeUser(productId, userId) {
    return user.findByIdAndUpdate(
      userId,
      { $pull: { likes: productId } },
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
