import { Router } from "express";
import createUserController from "../../controllers/users/createUser.controller";
import deleteUserController from "../../controllers/users/deleteUser.controller";
import listUsersController from "../../controllers/users/listUsers.controller";
import patchUserController from "../../controllers/users/patchUser.controller";
import verifyAdminTokenMiddleware from "../../middlewares/verifyAdminToken.middleware";
import verifyUserAuthMiddleware from "../../middlewares/verifyUserAuth.middleware";

const usersRoutes = Router();

usersRoutes.get("/users", verifyAdminTokenMiddleware, listUsersController);

usersRoutes.post("/users", createUserController);

usersRoutes.patch("/users/:id", verifyUserAuthMiddleware, patchUserController);

usersRoutes.delete(
  "/users/:id",
  verifyAdminTokenMiddleware,
  deleteUserController
);

export default usersRoutes;
