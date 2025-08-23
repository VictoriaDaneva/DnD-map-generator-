import Product from "../models/map.js";
import user from "../models/user.js";

const petsService = {
  search(query) {
    return Product.find({ title: { $regex: query, $options: "i" } });
  },

  //Wishlist Functionality
  removeWishlistUser(productId, userId) {
    return user.findOneAndUpdate(
      { _id: userId },
      { $pull: { wishlist: productId } },
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

  addToWishlistUser(productId, userId) {
    return user.findByIdAndUpdate(
      userId,
      { $push: { wishlist: productId } },
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
    return Product.findById(productId).lean();
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

  create(petData, userId) {
    return Product.create({ ...petData, owner: userId });
  },
};

export default petsService;
