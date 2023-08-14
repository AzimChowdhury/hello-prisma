import { Request, Response } from "express";
import { UserService } from "./user.services";

const insertIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertIntoDB(req.body);
    res.send({
      success: true,
      message: " user created successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const insertOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertOrUpdateProfile(req.body);
    res.send({
      success: true,
      message: "profile updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUsers();
    res.send({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getSingleUsers(Number(req.params.id));
    res.send({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const UserController = {
  insertIntoDB,
  insertOrUpdateProfile,
  getUsers,
  getSingleUsers,
};
