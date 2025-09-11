import { Schema, model, Types } from "mongoose";

const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Item type is required!"],
  },
  x: {
    type: Number,
    required: [true, "X coordinate is required!"],
  },
  y: {
    type: Number,
    required: [true, "Y coordinate is required!"],
  },
  size: {
    type: Number,
    default: 60,
  },
  rotation: {
    type: Number,
    default: 0,
  },
});

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The map title is required!"],
    },

    author: {
      type: String,
      required: [true, "Author is required!"],
    },

    description: {
      type: String,
      //required: [true, "Description is required!"],
    },

    biome: {
      type: String,
      required: [true, "Biome type is required!"],
    },
    image: {
      type: String,
      required: [true, "Image type is required!"],
    },
    tags: [
      {
        type: String,
      },
    ],

    items: [itemSchema],
    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      },
    ],

    likes: [
      {
        type: Types.ObjectId,
        ref: "Likes",
      },
    ],

    favourites: [
      {
        type: Types.ObjectId,
        ref: "Likes",
      },
    ],

    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
export default Product;
