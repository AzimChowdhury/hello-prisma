import { Request, Response } from "express";
import { PostServices } from "./post.services";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.createPost(req.body);
    res.send({
      success: true,
      message: "post created successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getPost = async (req: Request, res: Response) => {
  const options = req.query;
  try {
    const result = await PostServices.getPost(options);
    res.send({
      success: true,
      message: "post fetched successfully",
      total: result.total,
      data: result.result,
    });
  } catch (error) {
    res.send(error);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const result = await PostServices.updatePost(id, data);
    res.send({
      success: true,
      message: "post updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await PostServices.deletePost(id);
    res.send({
      success: true,
      message: "post deleted successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
