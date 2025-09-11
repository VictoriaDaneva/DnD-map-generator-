import { Router } from "express";
import mapsService from "../services/mapsService.js";
import { getErrrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middleware/authMiddleware.js";

const mapsController = Router();

//Remove from likes
mapsController.get("/:id/like/unsub", isOwner, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;

  try {
    await mapsService.unlike(productId, userId);
    await mapsService.removeLikeUser(productId, userId);
    res.status(200).json({ message: "Product is unliked successfully" });
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Add to likes
mapsController.get("/:id/like", isOwner, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;
  try {
    await mapsService.like(productId, userId);
    const isLiked = await mapsService.addToLikeUser(productId, userId);
    res.status(200).json({ isLiked });
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

// Delete comment
mapsController.delete("/comments/:commentId", isAuth, async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  try {
    const deleted = await mapsService.deleteComment(commentId, userId);
    if (!deleted) {
      return res
        .status(403)
        .json({ message: "Not authorized or comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: getErrrorMessage(err) });
  }
});

//Add comments
mapsController.post("/:id/comments", isAuth, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;
  const { text } = req.body;

  try {
    const comment = await mapsService.addComment(productId, userId, text);
    res.status(201).json(comment);
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Delete a post
mapsController.delete("/:id", checkIsOwner, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;
  try {
    await mapsService.removeFromUserProduct(userId, productId);
    await mapsService.removeProduct(productId);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Edit a post
mapsController.put("/:id/edit", async (req, res) => {
  const productId = req.params.id;
  const petParams = req.body;
  try {
    const data = await mapsService.editProduct(petParams, productId);
    return res.json(data);
  } catch (err) {
    const error = getErrrorMessage(err);
    return res.status(400).json({ message: error });
  }
});

//Details
mapsController.get("/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const data = await mapsService.getOne(productId);
    return res.json(data);
  } catch (err) {
    console.log(getErrrorMessage(err));
    return res.status(400).json({
      message: getErrrorMessage(err),
    });
  }
});

//Catalog
mapsController.get("/", async (req, res) => {
  try {
    const data = await mapsService.getAll();
    return res.json(data);
  } catch (err) {
    console.error(getErrrorMessage(err));
    return res.status(400).json({
      message: getErrrorMessage(err),
    });
  }
});

//Post a product
mapsController.post("/", isAuth, async (req, res) => {
  const mapData = req.body;
  const userId = req.user;

  try {
    const createdProduct = await mapsService.create(mapData, userId);
    await mapsService.addPostToUser(userId, createdProduct._id);
    return res.status(201).json({ data: createdProduct });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

async function isOwner(req, res, next) {
  let product = await mapsService.getOne(req.params.id);

  if (product.owner == req.user._id) {
    res.status(404);
  } else {
    next();
  }
}

async function checkIsOwner(req, res, next) {
  let product = await mapsService.getOne(req.params.id);

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized: No user ID found" });
  }

  if (product.owner._id.toString() === req.user._id) {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Not the owner" });
  }
}
export default mapsController;
