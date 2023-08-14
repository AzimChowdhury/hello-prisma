import express from "express";
import { PostController } from "./post.controller";
const router = express.Router();

router.post("/create-post", PostController.createPost);
router.get("/", PostController.getPost);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get("/aggregate", PostController.aggregateAndGrouping);

export const PostRoutes = router;
