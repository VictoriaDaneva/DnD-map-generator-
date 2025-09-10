import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required!"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);
export default Comment;
