import express from "express";
import { all } from "express/lib/application";
import { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoController";
import { protectedMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-g]{24})", watch);
videoRouter.route("/:id([0-9a-g]{24})/edit").all(protectedMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-g]{24})/delete").all(protectedMiddleware).get(deleteVideo);
videoRouter.route("/upload").all(protectedMiddleware).get(getUpload).post(videoUpload.single("video"), postUpload);

export default videoRouter;