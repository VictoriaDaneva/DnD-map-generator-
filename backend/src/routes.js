import { Router } from "express";
import authController from "./controllers/authController.js";
import profileController from "./controllers/profileController.js";
import mapsController from "./controllers/mapsController.js";

const routes = Router();

routes.use("/api/users/profile", profileController);
routes.use("/api", authController);
routes.use("/api/products", mapsController);

export default routes;
